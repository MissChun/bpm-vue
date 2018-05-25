#!/bin/bash
echo "正式发布"
USER=root
HOST=front.hhtdlng.com
DIR=/home/gitlab/front_test/tms_front
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "正式发布成功"
