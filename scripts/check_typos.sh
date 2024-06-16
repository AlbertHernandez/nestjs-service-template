#!/bin/bash

if ! command -v typos >/dev/null 2>&1; then
    echo "Typos CLI tool is not installed, aborting typo check."
    echo "If you want to install it, you can run 'brew install typos-cli'"
    exit 0 # We don't want to fail the build if the tool is not installed
fi

if [ "$#" -eq 0 ]; then
    files="."
else
    files="$@"
fi

typos $files
