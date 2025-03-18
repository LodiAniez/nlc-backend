## Run the server locally

- Make sure to clone the repository on your local machine.
- cd to the root directory then run `npm install` on your terminal to install the dependencies.
- create a `.env` file, copy the content of `.env.example` to your newly created `.env` file, values are sent separately through email.
- run `npm run dev` command to start the server locally.

## Start a docker container

- Make sure docker is installed on your machine.
- cd to the root directory where `.Dockerfile` is located.
- run `docker build -t service-order .` to build a docker image.
- run `docker run -d -p 127.0.0.1:3000:3000 service-order` to start the container.
- verify if the container is running by executing `docker ps` command.
