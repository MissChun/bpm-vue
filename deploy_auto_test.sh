#!/bin/bash
echo "自动化测试环境发布"
USER=root
HOST=39.104.185.174
DIR=/home/www/front/bpm_front
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "自动化测试环境发布"
