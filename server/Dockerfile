FROM node:20.10.0-alpine


ENV TZ=Europe/London
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

RUN apk update && apk add git

# Increase the limit of file watchers
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p


COPY ./package.json /usr/src/app/package.json
RUN yarn install

ADD . .
CMD ["yarn", "start"]
