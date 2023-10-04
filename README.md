# IntroWebHacking
This is a vulnerable web app for a SUGUS talk. You should not copy-paste this app, because it has serious easy-to-exploit vulnerabilities.

## Run in a container
If you want to run this vulnerable web app, first, you have to create the docker image. 
You first need to create a `.env` file in the `./backend` folder, with 3 lines:

```
MONGODB_URI=<url_to_mongodb>
PORT=<port>
SECRET=<your_db_user_password>
```

`cd` to the root folder of this project and:

```bash
docker build . -t webhackintro
```

Then, run this container with 

```bash
docker run -p 80:80 webhackintro
```
