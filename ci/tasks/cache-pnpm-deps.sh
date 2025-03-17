#!/bin/bash

set -eu

tar_out="$(pwd)/bundled-deps"

pushd deps
# Install dependencies
pnpm install

# Get git reference for versioning
git log --pretty=format:'%h' -n 1 > gitref

# Create the output filename
output_file="${tar_out}/bundled-deps-v$(cat ../deps-version/number)-$(cat gitref).tgz"

# Use --dereference to convert hard links to regular files
tar --dereference -zcf "$output_file" \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='ci' \
    .

popd
