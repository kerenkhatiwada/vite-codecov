#!/bin/bash

# Script to upload coverage to Codecov with flags (for local testing)
# Make sure you have CODECOV_TOKEN set in your environment

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "📊 Uploading coverage to Codecov with flags..."

# Upload with frontend flag
echo "Uploading with 'frontend' flag..."
npx codecov -f coverage/lcov.info -F frontend,unittests -n "local-frontend-upload"

# Upload with App flag
echo "Uploading with 'App' flag..."
npx codecov -f coverage/lcov.info -F App -n "local-app-upload"

# Upload with HelloWorld flag
echo "Uploading with 'HelloWorld' flag..."
npx codecov -f coverage/lcov.info -F HelloWorld -n "local-helloworld-upload"

echo "✅ Coverage upload complete! Check your Codecov dashboard."
