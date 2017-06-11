# Use boron: Node v6 LTS
FROM node:boron-slim

# Set environment variables
ENV USE_CHILDPROCESS true
ENV PORT 3000

# Set repository archive URL
ENV REPO_URL https://github.com/saschazar21/atkin-service/archive/master.tar.gz

WORKDIR /opt
RUN curl -L $REPO_URL | tar -xz --strip-components 1 \
  && yarn

# Expose port defined in environment variable
EXPOSE $PORT

CMD [ "npm", "start" ]
