#!/usr/bin/env bash

npm update -g
npm update

# TODO: fix this hack, to not use cd
cd docmanager/static/js
rollup -c --watch