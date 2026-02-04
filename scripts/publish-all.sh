#!/bin/bash
set -e

# Configuration
REPO_URL=$(git config --get remote.origin.url)

echo "🚀 Starting Publish Process..."

# 1. Build React (Standard)
echo "📦 Building React..."
npm run build 
# This runs 'vite build && tsc -b', outputting to 'dist' ('agent-neo.js' via vite config)

# 2. Build Angular Wrapper
echo "📦 Building Angular Wrapper..."
bash scripts/build-angular.sh
# Outputs to dist/angular-wrapper

# 3. Publish Unified Build to 'builds'
echo "📦 Creating Unified Build..."
rm -rf temp_publish_unified
mkdir temp_publish_unified
cd temp_publish_unified
git init
git remote add origin $REPO_URL
git fetch origin

# Copy React artifacts (standard and standalone)
cp -r ../dist/agent-neo.js .
cp -r ../dist/agent-neo.standalone.js .
cp -r ../dist/types .

# Copy Angular artifacts
cp -r ../dist/angular-wrapper/fesm2022 .
cp -r ../dist/angular-wrapper/index.d.ts .
cp -r ../dist/angular-wrapper/lib .
cp -r ../dist/angular-wrapper/public-api.d.ts .
cp -r ../dist/angular-wrapper/vendor .

# Create Unified package.json
cat > package.json <<EOF
{
  "name": "agent-neo",
  "version": "0.1.1",
  "type": "module",
  "main": "./agent-neo.js",
  "module": "./agent-neo.js",
  "types": "./types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./agent-neo.js"
    },
    "./standalone": {
      "import": "./agent-neo.standalone.js"
    },
    "./angular": {
      "types": "./index.d.ts",
      "import": "./fesm2022/agent-neo.mjs"
    }
  },
  "fesm2022": "./fesm2022/agent-neo.mjs",
  "typings": "./index.d.ts",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "@angular/core": ">=16.0.0",
    "@angular/common": ">=16.0.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  }
}
EOF

git checkout -b builds
git add .
git commit -m "build(unified): combined artifacts from $(date)"
git push -f origin builds
cd ..
rm -rf temp_publish_unified
echo "✅ Published builds"
