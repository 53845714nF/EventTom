### Build Stage

# use node image based on alpine linux, set alias as build-stage
FROM node:20-alpine as build-stage 

# set working directory insider the container to /app (if not exists, it will be created)
# all of the following commands (COPY, RUN) will be executed in this directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy all files from the current directory to the working directory of the container (except files in .dockerignore)
COPY . .

# build the app and output the files to /app/dist
# those files are optimized and minified for production
RUN npm run build



### Production Stage

# use nginx image based on alpine linux, set alias as production-stage
FROM nginx:stable-alpine as production-stage

# copy the build files (inside /app/dist) from the build-stage to the nginx server
COPY --from=build-stage /app/dist /usr/share/nginx/html

# expose port 80 because nginx listens on port 80
EXPOSE 80

# start nginx server
CMD ["nginx", "-g", "daemon off;"]
