## Run the server locally

- Make sure to clone the repository on your local machine.
- cd to the root directory then run `npm install` on your terminal to install the dependencies.
- create a `.env` file, copy the content of `.env.example` to your newly created `.env` file, values are sent separately through email.
- run `npm run dev` command to start the server locally.

## Start a docker container

- Make sure docker is installed on your machine.
- cd to the root directory where `.Dockerfile` is located.
- run `docker compose up` to build and run the app.
- verify if the container is running by executing `docker ps` command.
