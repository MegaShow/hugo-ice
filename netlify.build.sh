#!/bin/bash

BIN_DIR=/opt/build/repo/node_modules/.bin
DARTSASS_VERSION=1.62.0

BASE_URL=${URL}
if [ ${CONTEXT} != 'production' ]
then
    BASE_URL=${DEPLOY_PRIME_URL}
fi

# 安装 Dart Sass
echo "Install Dart Sass Embedded..."
mkdir -p $BIN_DIR
curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz
tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz
rm sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz
mv sass_embedded/* $BIN_DIR
dart-sass-embedded --version

# 构建示例站点
echo "Building Example Site..."
hugo --minify --source exampleSite --themesDir ../.. --theme repo --baseURL ${BASE_URL}
