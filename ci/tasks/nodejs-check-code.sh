#!/bin/bash

#! Auto synced from Shared CI Resources repository
#! Don't change this file, instead change it in github.com/blinkbitcoin/concourse-shared

set -eu

export REPO_PATH=repo

. pipeline-tasks/ci/tasks/nodejs-helpers.sh

unpack_deps

pushd repo

make check-code
