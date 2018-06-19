#!/bin/bash
echo "开发环境发布"
USER=root
HOST=devbpm.hhtdlng.com
DIR=/home/www/front/bpm_front
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "开发环境发布"
