#!/bin/bash

check_typos_installed() {
    if ! command -v typos >/dev/null 2>&1; then
        echo "Typos CLI tool is not installed, aborting typo check."
        echo "If you want to install it, you can run 'brew install typos-cli'"
        exit 0 # We don't want to fail the build if the tool is not installed
    fi
}

get_files() {
    if [ "$#" -eq 0 ]; then
        echo "."
    else
        echo "$@"
    fi
}

filter_files() {
    IGNORE_EXTENSIONS=("png" "snap" "jpg")

    local files="$1"
    local filtered=""
    for file in $files; do
        ignore_file=false
        for ext in "${IGNORE_EXTENSIONS[@]}"; do
            if [[ $file == *.$ext ]]; then
                ignore_file=true
                break
            fi
        done
        if [ "$ignore_file" = false ]; then
            filtered="$filtered $file"
        fi
    done
    echo "$filtered"
}

convert_to_relative_paths() {
    local files="$1"
    local current_dir=$(pwd)
    local relative=""
    for file in $files; do
        relative="$relative ${file#$current_dir/}"
    done
    echo "$relative"
}

check_typos_installed
absolute_path_files=$(get_files "$@")
filtered_files=$(filter_files "$absolute_path_files")
relative_files=$(convert_to_relative_paths "$filtered_files")
typos $relative_files
