FROM node:22-alpine AS base

ARG BUILD_DATE
ARG BUILD_BRANCH
ARG BUILD_SHA

ENV LANG=en_US.UTF-8

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install


# Run stage
FROM base AS runner
COPY --from=base /app/node_modules /app/node_modules
COPY . .

RUN yarn db:generate && \
    yarn typespec

EXPOSE 6882
CMD ["yarn", "start"]

