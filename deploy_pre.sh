#!/bin/bash
echo "预发发布"
USER=root
HOST=39.104.21.131
DIR=/home/www/front/bpm_front
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "测试发布成功"
