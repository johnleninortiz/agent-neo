#!/bin/bash
set -e

# Configuration
REPO_URL=$(git config --get remote.origin.url)

echo "🚀 Starting Publish Process..."

# 1. Build React (Standard)
echo "📦 Building React..."
npm run build 
# This runs 'vite build && tsc -b', outputting to 'dist' ('agent-neo.js' via vite config)

# 2. Publish React Build to 'builds/react'
# We'll use a temp dir
rm -rf temp_publish_react
mkdir temp_publish_react
cd temp_publish_react
git init
git remote add origin $REPO_URL
git fetch origin
# Only copy dist contents needed for React consumers (or web component usage)
# Copy dist contents to root
cp -r ../dist/* .

# Create a clean package.json for the build
cat > package.json <<EOF
{
  "name": "agent-neo",
  "version": "0.1.0",
  "type": "module",
  "module": "./agent-neo.js",
  "types": "./types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./agent-neo.js"
    }
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
EOF
git checkout -b builds/react
git add .
git commit -m "build(react): artifacts from $(date)"
git push -f origin builds/react
cd ..
rm -rf temp_publish_react
echo "✅ Published builds/react"

# 3. Build Angular Wrapper
echo "📦 Building Angular Wrapper..."
bash scripts/build-angular.sh
# Outputs to dist/angular-wrapper

# 4. Publish Angular Wrapper to 'builds/angular'
rm -rf temp_publish_angular
mkdir temp_publish_angular
cd temp_publish_angular
git init
git remote add origin $REPO_URL
git fetch origin
cp -r ../dist/angular-wrapper/* .
# README for Angular specific
echo "# Agent Neo (Angular Wrapper)" > README.md
git checkout -b builds/angular
git add .
git commit -m "build(angular): artifacts from $(date)"
git push -f origin builds/angular
cd ..
rm -rf temp_publish_angular
echo "✅ Published builds/angular"
