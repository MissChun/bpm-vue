#!/bin/bash
echo "测试发布"
USER=app
HOST=39.104.57.105
DIR=/www/front/bpm_front
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "测试发布成功"

