#!/bin/bash

echo "🧪 Testing Codecov Carryforward Functionality"
echo "=============================================="

# Make sure we have a clean state
rm -rf coverage coverage-partial

echo ""
echo "📊 Step 1: Run full test suite to establish baseline..."
npm run test:coverage

echo ""
echo "📋 Full coverage results:"
echo "Coverage files generated in ./coverage/"
ls -la coverage/

echo ""
echo "📈 Step 2: Upload full coverage to Codecov..."
if [ -z "$CODECOV_TOKEN" ]; then
    echo "⚠️  CODECOV_TOKEN not set. Skipping upload."
    echo "   Set CODECOV_TOKEN environment variable to test uploads."
else
    # Upload full coverage with all flags
    npx codecov -f coverage/lcov.info -F full-suite,baseline -n "local-full-baseline"
    npx codecov -f coverage/lcov.info -F App -n "local-app-baseline"
    npx codecov -f coverage/lcov.info -F HelloWorld -n "local-helloworld-baseline"
    npx codecov -f coverage/lcov.info -F NewComponent -n "local-newcomponent-baseline"
fi

echo ""
echo "🔄 Step 3: Run partial test suite (excludes NewComponent tests)..."
npm run test:partial

echo ""
echo "📋 Partial coverage results:"
echo "Coverage files generated in ./coverage-partial/"
ls -la coverage-partial/

echo ""
echo "📊 Comparing coverage reports:"
echo "Full suite coverage:"
grep -A 10 "All files" coverage/lcov-report/index.html | head -5 || echo "Full coverage summary not available"

echo ""
echo "Partial suite coverage:"
grep -A 10 "All files" coverage-partial/lcov-report/index.html | head -5 || echo "Partial coverage summary not available"

echo ""
echo "📈 Step 4: Upload partial coverage (carryforward test)..."
if [ -z "$CODECOV_TOKEN" ]; then
    echo "⚠️  CODECOV_TOKEN not set. Skipping upload."
    echo "   The carryforward test requires uploading to Codecov."
else
    # Upload partial coverage - NewComponent should carryforward previous data
    npx codecov -f coverage-partial/lcov.info -F partial-suite,carryforward-test -n "local-partial-carryforward"
    npx codecov -f coverage-partial/lcov.info -F App -n "local-app-partial"
    npx codecov -f coverage-partial/lcov.info -F HelloWorld -n "local-helloworld-partial"
    # This should trigger carryforward for NewComponent since no new data
    npx codecov -f coverage-partial/lcov.info -F NewComponent -n "local-newcomponent-carryforward"
fi

echo ""
echo "✅ Carryforward test complete!"
echo ""
echo "🔍 What to check in Codecov dashboard:"
echo "1. Full suite should show ~93% coverage for all components"
echo "2. Partial suite should show lower overall coverage (~53%)"
echo "3. NewComponent flag should maintain coverage from baseline (carryforward)"
echo "4. App and HelloWorld flags should show current test results"
echo ""
echo "📝 Note: Carryforward preserves coverage for files not touched in current upload"
