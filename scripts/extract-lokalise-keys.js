import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract keys and their text content from the lokalize page
const extractKeysAndText = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const keysAndText = new Map();
  
  // Match data-lokalise elements with their text content
  const regex = /<[^>]+data-lokalise[^>]+data-key="([^"]+)"[^>]*>(.*?)<\/[^>]+>/gs;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    let text = match[2]
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .replace(/&quot;/g, '"') // Convert HTML entities
      .replace(/&apos;/g, "'")
      .trim();
    
    // Skip empty text
    if (text) {
      keysAndText.set(key, text);
    }
  }
  
  // Also match self-closing elements or elements with special attributes
  const placeholderRegex = /data-key="([^"]+)"\s+data-type-placeholder[^>]*placeholder="([^"]+)"/g;
  while ((match = placeholderRegex.exec(content)) !== null) {
    keysAndText.set(match[1], match[2]);
  }
  
  return keysAndText;
};

// Generate the correct JSON format for Lokalise
const generateCorrectLokaliseJSON = (keysAndText) => {
  const translations = {};
  
  keysAndText.forEach((text, key) => {
    // Lokalise expects flat structure with just key-value pairs for the base language
    translations[key] = text;
  });
  
  return translations;
};

// Generate CSV format (alternative that works better)
const generateCSV = (keysAndText) => {
  const headers = ['Key', 'English', 'Spanish', 'French', 'German'];
  const rows = [headers.join(',')];
  
  keysAndText.forEach((text, key) => {
    // Escape quotes in CSV
    const escapedText = `"${text.replace(/"/g, '""')}"`;
    rows.push(`"${key}",${escapedText},"","",""`);
  });
  
  return rows.join('\n');
};

// Main execution
const main = () => {
  try {
    const pageFilePath = path.join(__dirname, '../app/lokalize/page.tsx');
    
    if (!fs.existsSync(pageFilePath)) {
      console.error('❌ lokalize/page.tsx not found');
      return;
    }
    
    console.log('🔍 Extracting keys and text from lokalize page...');
    const keysAndText = extractKeysAndText(pageFilePath);
    
    console.log(`📋 Found ${keysAndText.size} unique keys with text:`);
    keysAndText.forEach((text, key) => {
      const truncatedText = text.length > 50 ? text.substring(0, 47) + '...' : text;
      console.log(`  • ${key}: "${truncatedText}"`);
    });
    
    // Create output directory
    const outputDir = path.join(__dirname, '../lokalise-export');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate correct JSON format (flat structure)
    const correctJSON = generateCorrectLokaliseJSON(keysAndText);
    
    // Write corrected JSON file
    const jsonFilePath = path.join(outputDir, 'lokalise-import-correct.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(correctJSON, null, 2));
    
    // Write CSV file (recommended format)
    const csvContent = generateCSV(keysAndText);
    const csvFilePath = path.join(outputDir, 'lokalise-import-correct.csv');
    fs.writeFileSync(csvFilePath, csvContent);
    
    console.log('\n✅ Corrected files generated:');
    console.log(`📄 JSON (flat): ${jsonFilePath}`);
    console.log(`📊 CSV (recommended): ${csvFilePath}`);
    
    console.log('\n🚀 Upload Instructions (Fixed):');
    console.log('1. Go to https://app.lokalise.com/projects/2737462568503fbe1a3da6.74461504');
    console.log('2. Click "Upload" → "File"');
    console.log('3. Select the CSV file (recommended) or JSON file');
    console.log('4. Import settings:');
    console.log('   • File format: CSV or JSON');
    console.log('   • Language: English');
    console.log('   • Replace modified: Yes');
    console.log('   • Key separator: . (dot)');
    console.log('5. Click "Upload"');
    console.log('6. Keys will be created WITHOUT ::en suffix!');
    
    console.log('\n⚠️  To fix existing keys with ::en suffix:');
    console.log('1. Go to your Lokalise project');
    console.log('2. Select all keys with ::en suffix');
    console.log('3. Use "Bulk actions" → "Delete" to remove them');
    console.log('4. Then upload the corrected file');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

main(); 
