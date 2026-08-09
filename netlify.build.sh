#!/bin/bash

BIN_DIR=/opt/build/repo/node_modules/.bin
DARTSASS_VERSION=1.102.0

BASE_URL=${URL}
if [ ${CONTEXT} != 'production' ]
then
    BASE_URL=${DEPLOY_PRIME_URL}
fi

# 安装 Dart Sass
echo "Install Dart Sass..."
mkdir -p $BIN_DIR
curl -LJO https://github.com/sass/dart-sass/releases/download/${DARTSASS_VERSION}/dart-sass-${DARTSASS_VERSION}-linux-x64.tar.gz
tar -xvf dart-sass-${DARTSASS_VERSION}-linux-x64.tar.gz
rm dart-sass-${DARTSASS_VERSION}-linux-x64.tar.gz
mv dart-sass/* $BIN_DIR
sass --version

# 构建示例站点
echo "Building Example Site..."
hugo --minify --source exampleSite --themesDir ../.. --theme repo --baseURL ${BASE_URL}
