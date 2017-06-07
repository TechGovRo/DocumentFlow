#!/usr/bin/env bash

apt update

apt install -y build-essential libssl-dev
apt install -y curl postgresql redis-server g++
apt install -y postgresql-server-dev-all

# Install NodeJS 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt install -y nodejs

npm install -g babel-cli rollup
npm install --dev

apt install -y libjpeg-dev libpng-dev
apt install -y python3-dev
