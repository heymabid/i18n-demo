/* eslint-disable @typescript-eslint/no-explicit-any */
import crowdin, { Credentials } from '@crowdin/crowdin-api-client';

export interface CrowdinConfig {
  token: string;
  projectId: string;
  organization?: string;
}

export interface TranslationFile {
  id: number;
  name: string;
  path: string;
  type: string;
  progress?: {
    total: number;
    translated: number;
    approved: number;
  };
}

export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  languages: Array<{
    id: string;
    name: string;
    code: string;
    progress: number;
  }>;
  files: TranslationFile[];
}

export class CrowdinService {
  private api: any;
  private config: CrowdinConfig;

  constructor(config: CrowdinConfig) {
    this.config = config;
    
    const credentials: Credentials = {
      token: config.token,
    };

    if (config.organization) {
      credentials.organization = config.organization;
    }

    this.api = new crowdin(credentials);
  }

  // Get project information
  async getProjectInfo(): Promise<ProjectInfo | null> {
    try {
      const project = await this.api.projectsGroupsApi.getProject(Number(this.config.projectId));
      
      // Get project languages
      const languagesResponse = await this.api.languagesApi.listProjectLanguages(Number(this.config.projectId));
      
      // Get project files
      const filesResponse = await this.api.sourceFilesApi.listProjectFiles(Number(this.config.projectId));

      // Get translation progress
      const progressResponse = await this.api.translationStatusApi.getProjectProgress(Number(this.config.projectId));

      return {
        id: project.data.id,
        name: project.data.name,
        description: project.data.description || '',
        languages: languagesResponse.data.map((lang: any) => ({
          id: lang.data.id,
          name: lang.data.name,
          code: lang.data.twoLettersCode,
          progress: progressResponse.data.find((p: any) => p.data.languageId === lang.data.id)?.data.translationProgress || 0
        })),
        files: filesResponse.data.map((file: any) => ({
          id: file.data.id,
          name: file.data.name,
          path: file.data.path,
          type: file.data.type
        }))
      };
    } catch (error) {
      console.error('Failed to get Crowdin project info:', error);
      return null;
    }
  }

  // Upload source file
  async uploadFile(filePath: string, content: string, fileName: string): Promise<boolean> {
    try {
      // First, create storage for the file
      const storage = await this.api.uploadStorageApi.addStorage(fileName, content);
      
      // Then add the file to the project
      await this.api.sourceFilesApi.createFile(Number(this.config.projectId), {
        name: fileName,
        storageId: storage.data.id,
        type: 'auto'
      });

      console.log(`✅ Successfully uploaded ${fileName} to Crowdin`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to upload ${fileName} to Crowdin:`, error);
      return false;
    }
  }

  // Update existing file
  async updateFile(fileId: number, content: string): Promise<boolean> {
    try {
      const fileName = `temp_${Date.now()}.json`;
      const storage = await this.api.uploadStorageApi.addStorage(fileName, content);
      
      await this.api.sourceFilesApi.updateFile(Number(this.config.projectId), fileId, {
        storageId: storage.data.id
      });

      console.log(`✅ Successfully updated file ${fileId} in Crowdin`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to update file ${fileId} in Crowdin:`, error);
      return false;
    }
  }

  // Download translations
  async downloadTranslations(languageId: string): Promise<string | null> {
    try {
      // Build project translation
      const build = await this.api.translationsApi.buildProjectTranslation(Number(this.config.projectId), {
        targetLanguageId: languageId,
        skipUntranslatedStrings: false,
        exportApprovedOnly: false
      });

      // Wait for build to complete
      let buildStatus = await this.api.translationsApi.checkProjectBuildStatus(Number(this.config.projectId), build.data.id);
      
      while (buildStatus.data.status !== 'finished') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        buildStatus = await this.api.translationsApi.checkProjectBuildStatus(Number(this.config.projectId), build.data.id);
        
        if (buildStatus.data.status === 'failed') {
          throw new Error('Build failed');
        }
      }

      // Download the built translation
      const download = await this.api.translationsApi.downloadProjectTranslations(Number(this.config.projectId), build.data.id);
      
      console.log(`✅ Successfully downloaded translations for ${languageId}`);
      return download.data.url;
    } catch (error) {
      console.error(`❌ Failed to download translations for ${languageId}:`, error);
      return null;
    }
  }

  // Get translation progress
  async getTranslationProgress(): Promise<Array<{ language: string; progress: number }> | null> {
    try {
      const progressResponse = await this.api.translationStatusApi.getProjectProgress(Number(this.config.projectId));
      
      return progressResponse.data.map((item: any) => ({
        language: item.data.language.name,
        progress: item.data.translationProgress
      }));
    } catch (error) {
      console.error('Failed to get translation progress:', error);
      return null;
    }
  }

  // Add string to project
  async addString(key: string, text: string, context?: string): Promise<boolean> {
    try {
      await this.api.sourceStringsApi.addString(Number(this.config.projectId), {
        identifier: key,
        text: text,
        context: context,
        isHidden: false
      });

      console.log(`✅ Successfully added string "${key}" to Crowdin`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to add string "${key}" to Crowdin:`, error);
      return false;
    }
  }
}

// Create and export service instance
export const createCrowdinService = (config: CrowdinConfig) => {
  return new CrowdinService(config);
};

// Default service instance
export const crowdinService = createCrowdinService({
  token: process.env.CROWDIN_API_TOKEN || '',
  projectId: process.env.CROWDIN_PROJECT_ID || '',
  organization: process.env.CROWDIN_ORGANIZATION
}); 
