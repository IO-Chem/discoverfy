# Latest LTS Node release as of 2022.08.19
FROM node:16.17.0-alpine3.16

# Potential fix to prevent containers from crashing when
# the number of filewatchers are short
RUN echo fs.inotify.max_user_watches=393210 | tee -a /etc/sysctl.conf && sysctl -p

# Set working directory for image
WORKDIR /app

# Copy package.json and yarn.lock to root directory
#COPY /app/package*.json ./

# Install all necessary packages
#RUN npm install

#ENV PATH=$PATH:./node_modules/.bin

#COPY ./app .