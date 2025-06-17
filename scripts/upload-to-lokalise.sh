#!/bin/bash

# Install Lokalise CLI if not installed
if ! command -v lokalise2 &> /dev/null
then
    echo "📦 Installing Lokalise CLI..."
    npm install -g @lokalise/cli
fi

# Set your API token (get from https://app.lokalise.com/profile)
# export LOKALISE_API_TOKEN="your_api_token_here"

PROJECT_ID="2737462568503fbe1a3da6.74461504"

echo "🚀 Uploading keys to Lokalise project: $PROJECT_ID"

# Upload the JSON file
lokalise2 --token="$LOKALISE_API_TOKEN" \
  file upload \
  --project-id="$PROJECT_ID" \
  --file="lokalise-export/keys-with-content.json" \
  --lang-iso="en" \
  --replace-modified \
  --include-path \
  --use-automations=false

echo "✅ Keys uploaded successfully!"
echo "🌐 Visit: https://app.lokalise.com/projects/$PROJECT_ID" 
