FROM node:10-alpine

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
 && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
 && apk --no-cache update \
 && apk --no-cache upgrade \
 && apk add --no-cache chromium chromium-chromedriver \
 && rm -rf /var/cache/apk/* /tmp/*

ENV CHROME_BIN=/usr/bin/chromium-browser \
 CHROME_PATH=/usr/lib/chromium/ \
 CHROME_DRIVER=/usr/bin/chromedriver
