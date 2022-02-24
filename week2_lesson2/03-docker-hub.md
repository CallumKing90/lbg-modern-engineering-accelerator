# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Docker Installation

### Learning Objectives

- Start to use docker and understand what it's doing

## Lesson Overview

| Topic      | Type     | Timing |
| ---------- | -------- | ------ |
| Docker Hub | Exercise | 15 min |

## Docker Hub (15 min)

Docker Hub is a repository of free public images that can be downloaded and run. According to [Docker](https://www.docker.com/), it is the world's largest library and community for container images. You can access and create an account on Docker Hub [here](https://hub.docker.com/).

### Hello World

Let's run our first docker command. Open terminal, make sure docker-daemon is running.

![](https://i.redd.it/jlui6uo24vk21.jpg)

Run `docker run hello-world` on the terminal. Scroll up, look for the text `Unable to find image 'hello-world:latest' locally`.

> You may not see it if you have run this image before.

This command means we want to start a new container using image `hello-world`. This image has a program inside it, that's purpose is to print this,

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
```

What this means?

- When the command is run, it starts up docker client/docker CLI.
- Which in turn takes commands from you and communicates command to docker server.
- Docker server checks to see if this image exists locally in image cache.
- For the first run of this image cache will be empty and this is where docker hub comes in.
- Docker server checks with docker hub which has the image
- The image will be downloaded and stored in the image cache.
- Now docker server will use this image to create an instance of a container.

### You Do

Run the same command a second time. Notice anything different from the first run?

The second time you will not see the message `Unable to find image 'hello-world:latest' locally`. Why's that? Think about it.

Docker caches the images...

## Conclusion (5 min)

Before we get to Docker commands, let's take a moment to recap.

<!--**Instructor Note**: Lead discussion with the class.-->

1. What is Docker Hub?
2. How to use Docker Desktop?
