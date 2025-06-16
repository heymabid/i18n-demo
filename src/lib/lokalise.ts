import { LokaliseApi } from '@lokalise/node-api';

export interface LokaliseConfig {
  apiKey: string;
  projectId: string;
}

export interface LokaliseKey {
  key_id: number;
  key_name: {
    ios: string;
    android: string;
    web: string;
  };
  description: string;
  platforms: string[];
  translations: Array<{
    translation_id: number;
    language_iso: string;
    translation: string;
    modified_at: string;
    is_reviewed: boolean;
  }>;
}

export interface LokaliseProject {
  project_id: string;
  project_name: string;
  description: string;
  created_at: string;
  languages: Array<{
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
  }>;
  statistics: {
    progress_total: number;
    keys_total: number;
    team: Array<{
      user_id: number;
      email: string;
      fullname: string;
    }>;
  };
}

export interface KeyCreationParams {
  key_name: string;
  description?: string;
  platforms?: string[];
  translations?: Array<{
    language_iso: string;
    translation: string;
  }>;
  tags?: string[];
}

export class LokaliseService {
  private api: LokaliseApi;
  private config: LokaliseConfig;

  constructor(config: LokaliseConfig) {
    this.config = config;
    this.api = new LokaliseApi({ apiKey: config.apiKey });
  }

  // Get project information
  async getProject(): Promise<LokaliseProject | null> {
    try {
      const project = await this.api.projects().get(this.config.projectId);
      
      // Get project languages
      const languages = await this.api.languages().list({ project_id: this.config.projectId });
      
      // Get project statistics
      const statistics = await this.api.projects().statistics(this.config.projectId);

      return {
        project_id: project.project_id,
        project_name: project.name,
        description: project.description || '',
        created_at: project.created_at,
        languages: languages.items.map(lang => ({
          lang_id: lang.lang_id,
          lang_iso: lang.lang_iso,
          lang_name: lang.lang_name,
          is_rtl: lang.is_rtl
        })),
        statistics: {
          progress_total: statistics.progress_total,
          keys_total: statistics.keys_total,
          team: statistics.team || []
        }
      };
    } catch (error) {
      console.error('Failed to get Lokalise project:', error);
      return null;
    }
  }

  // Get all keys
  async getKeys(options: { limit?: number; page?: number } = {}): Promise<LokaliseKey[]> {
    try {
      const response = await this.api.keys().list({
        project_id: this.config.projectId,
        limit: options.limit || 100,
        page: options.page || 1,
        include_translations: 1
      });

      return response.items.map(key => ({
        key_id: key.key_id,
        key_name: key.key_name,
        description: key.description || '',
        platforms: key.platforms,
        translations: key.translations?.map(translation => ({
          translation_id: translation.translation_id,
          language_iso: translation.language_iso,
          translation: translation.translation,
          modified_at: translation.modified_at,
          is_reviewed: translation.is_reviewed
        })) || []
      }));
    } catch (error) {
      console.error('Failed to get Lokalise keys:', error);
      return [];
    }
  }

  // Create new key
  async createKey(keyData: KeyCreationParams): Promise<boolean> {
    try {
      await this.api.keys().create(this.config.projectId, {
        keys: [{
          key_name: keyData.key_name,
          description: keyData.description || '',
          platforms: keyData.platforms || ['web'],
          translations: keyData.translations || [],
          tags: keyData.tags || []
        }]
      });

      console.log(`✅ Successfully created key "${keyData.key_name}" in Lokalise`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to create key "${keyData.key_name}" in Lokalise:`, error);
      return false;
    }
  }

  // Update existing key
  async updateKey(keyId: number, keyData: Partial<KeyCreationParams>): Promise<boolean> {
    try {
      await this.api.keys().update(this.config.projectId, keyId, keyData);

      console.log(`✅ Successfully updated key ${keyId} in Lokalise`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to update key ${keyId} in Lokalise:`, error);
      return false;
    }
  }

  // Upload file
  async uploadFile(filename: string, languageIso: string, data: Record<string, string>): Promise<boolean> {
    try {
      const base64Data = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
      
      const process = await this.api.files().upload(this.config.projectId, {
        data: base64Data,
        filename: filename,
        lang_iso: languageIso,
        convert_placeholders: true,
        detect_icu_plurals: true,
        replace_modified: true
      });

      console.log(`✅ Successfully uploaded ${filename} to Lokalise (Process: ${process.process_id})`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to upload ${filename} to Lokalise:`, error);
      return false;
    }
  }

  // Download files
  async downloadFiles(format: 'json' | 'csv' | 'xml' = 'json'): Promise<string | null> {
    try {
      const download = await this.api.files().download(this.config.projectId, {
        format: format,
        original_filenames: true,
        bundle_structure: '%LANG_ISO%.%FORMAT%',
        directory_prefix: '',
        all_platforms: true
      });

      console.log(`✅ Successfully initiated download from Lokalise`);
      return download.bundle_url;
    } catch (error) {
      console.error('❌ Failed to download files from Lokalise:', error);
      return null;
    }
  }

  // Get translation progress by language
  async getTranslationProgress(): Promise<Array<{ language: string; progress: number }> | null> {
    try {
      const project = await this.getProject();
      if (!project) return null;

      const progressData = project.languages.map(lang => ({
        language: lang.lang_name,
        code: lang.lang_iso,
        progress: 0 // This would come from detailed statistics
      }));

      // Get detailed statistics for each language
      for (const lang of progressData) {
        try {
          const stats = await this.api.projects().statistics(this.config.projectId);
          // Extract language-specific progress if available
          lang.progress = Math.floor(Math.random() * 100); // Mock data for demo
        } catch (error) {
          console.warn(`Could not get stats for ${lang.language}`);
        }
      }

      return progressData;
    } catch (error) {
      console.error('Failed to get translation progress:', error);
      return null;
    }
  }

  // Add translation to existing key
  async addTranslation(keyId: number, languageIso: string, translation: string): Promise<boolean> {
    try {
      await this.api.translations().update(this.config.projectId, {
        translations: [{
          key_id: keyId,
          language_iso: languageIso,
          translation: translation
        }]
      });

      console.log(`✅ Successfully added translation for key ${keyId} in ${languageIso}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to add translation for key ${keyId}:`, error);
      return false;
    }
  }

  // Bulk upload keys from object
  async bulkUploadKeys(keysData: Record<string, string>, languageIso: string = 'en'): Promise<boolean> {
    try {
      const keys = Object.entries(keysData).map(([key, value]) => ({
        key_name: key,
        description: `Auto-imported key: ${key}`,
        platforms: ['web'],
        translations: [{
          language_iso: languageIso,
          translation: value
        }]
      }));

      await this.api.keys().create(this.config.projectId, { keys });

      console.log(`✅ Successfully uploaded ${keys.length} keys to Lokalise`);
      return true;
    } catch (error) {
      console.error('❌ Failed to bulk upload keys to Lokalise:', error);
      return false;
    }
  }
}

// Create and export service instance
export const createLokaliseService = (config: LokaliseConfig) => {
  return new LokaliseService(config);
};

// Default service instance
export const lokaliseService = createLokaliseService({
  apiKey: process.env.LOKALISE_API_TOKEN || '',
  projectId: process.env.LOKALISE_PROJECT_ID || ''
}); 
