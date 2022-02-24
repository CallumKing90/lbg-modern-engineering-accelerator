# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) How To Dockerize

### Learning Objectives

- Why is Docker Compose used?
- Explain Docker Compose
- Understand how it works?
- Learn Docker Compose commands

## Lesson Overview

| Topic                    | Type     | Timing |
| ------------------------ | -------- | ------ |
| Dockerfile               | Lecture  | 20 min |
| Docker Volumes           | Lecture  | 15 min |
| Activity: Dockerfile     | Exercise | 15 min |
| Push Image to Docker Hub | Exercise | 50 min |

![](https://www.memecreator.org/static/images/memes/5099940.jpg)

## Dockerfile (20 min)

So far we have used an existing image to run a container. But we haven't talked about how to create an image or like people say dockerize our app.

According to [docs](https://docs.docker.com/engine/reference/builder/#:~:text=A%20Dockerfile%20is%20a%20text,command%2Dline%20instructions%20in%20succession.), a **Dockerfile** is a text document that contains all the commands a user could call on the command line to assemble an image. It is used by docker to build images automatically by reading instructions from it.

You can specify details like, the OS, languages, etc. Explain what the container will do when it's run. You can create your own or use premade ones.

It's basically a set of instructions to set up the container. You can include steps such as copying source code into the container and terminal commands to run for when we are ready to start the application.

Here's an example of what a Dockerfile might look like:

```
FROM tomcat:8.0-alpine

LABEL maintainer=”tristan.hall@generalassemb.ly”

ADD JavaWebApp.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD [“catalina.sh”, “run”]
```

Dockerfile is named as just `Dockerfile`. It is case-sensitive and without any extension.

Lets go over what the above instructions mean,

- The `FROM` instruction initializes a new build stage and sets the base image for subsequent instructions. So in this case we are using tomcat image.
- The `LABEL` instruction sets the Author field of the generated images. You could use any key-value pair in labels.
- The `ADD` instruction copies new files, directories or remote file URLs from <src> and adds them to the filesystem of the image at the path <dest>.
- The `EXPOSE` instruction informs Docker that the container listens on the specified network ports at runtime.
- The `CMD` instruction specifies what to run when the container (not the image) is run. In our case, Tomcat server is started by running the shell script that starts the web container. There can only be one `CMD` instruction in a `Dockerfile`.

There are lot of other instructions you can have in a Dockerfile. We will go over some of them as needed.

Let's see how we can start a [simple node.js application](./example) in a docker container from scratch.
