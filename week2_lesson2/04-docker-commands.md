# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Power of Docker

### Learning Objectives

- Explain container lifecycle
- Run Docker Commands
- Understand Docker

## Lesson Overview

| Topic               | Type    | Timing |
| ------------------- | ------- | ------ |
| Container Lifecycle | Lecture | 15 min |
| Docker Commands     | Lecture | 40 min |

Total 55 mins

## Container Lifecycle (15 min)

Before learning about Docker commands lets look at life of a container.

To start up a new container from an image we use `docker run` command. `docker run` creates a new container and starts it. But creating a container and starting it up are 2 different processes.

docker run = docker create + docker start

When a container is created the file system is prepped for use in the new container. To start the container means executing the startup command that comes with the image.

Lets see it in action. Open terminal and create hello-world image.

`docker create hello-world`

This will output an id something like this, `2ce9bdb14238e8a6ba2ac68964ee8ca48e93e9cbf90d0c2c3f441d6be279e8b4`. This is the id of the container that just executed.

Now run `docker start` with the container id.

`docker start -a 2ce9bdb14238e8a6ba2ac68964ee8ca48e93e9cbf90d0c2c3f441d6be279e8b4`

> `-a` makes docker watch for output from the container and print it out to the terminal.

![](https://miro.medium.com/max/2000/0*3_uIz_YMiyZxMwKn)

## Docker Commands (45 min)

### `docker run`

We have already run this command before, it runs a container

We can also give another command with run to override the startup command.

`docker run <image name> <command-to-override>`

Example, `docker run busybox ls` will list all the files in `busybox` image.

### `docker ps`

Lists all the different currently running containers.

Go ahead run `docker ps` on the terminal. You may not see anything right now as there are no active containers. Lets run `docker run busybox ping google.com`, this will keep pinging `google.com` for us and on another terminal run `docker ps`,

Now you will see something like,

```
CONTAINER ID   IMAGE     COMMAND             CREATED         STATUS         PORTS     NAMES
f7eea52fa97e   busybox   "ping google.com"   7 seconds ago   Up 6 seconds             jovial_nash
```

> Status shows the status of the container, if it is still up or exited.
> jovial_nash is a randomly generated name to identify this container.

Now `ctrl-c` on the terminal which is running the container and run `docker ps` again. You will again get no output.

`docker ps --all` will list all the containers you ever ran.

### `docker start`

Starts the docker container after it has been created. We can also start an exited container.

Run `docker ps --all`.

```
CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS                       PORTS                    NAMES
2ce9bdb14238   hello-world                           "/hello"                 52 minutes ago   Created                                               vibrant_benz
f7eea52fa97e   busybox                               "ping google.com"        17 hours ago     Exited (0) 17 hours ago                               jovial_nash
570646e6503c   busybox                               "ls"                     17 hours ago     Exited (0) 17 hours ago                               intelligent_lederberg

```

Find the hello-world container id. Use this id to restart the exited container.

`docker start -a 2ce9bdb14238`

### `docker logs`

To retrieve logs of an exited or up container. All you need is the container id.

You can use the container id used previously or get a new one by running `docker ps --all`.

`docker logs 2ce9bdb14238`

This will print all the logs emitted from that container.

### `docker stop` OR `docker kill`

If `ctrl-c` is not an option or even otherwise, in order to stop a running container we can use stop or kill command. They both stop the container with just one key difference. `docker stop` sends a signal _SIGTERM_ (short for terminate signal) to process in a container to shut down on its own time. Gives process time to do any clean up activities. `docker kill` issues a _SIGKILL_ (kill signal) message to the primary running process inside the container which means stop right now with no time for any clean up activity.

If the container doesn't stop with `docker stop` you can always run `docker kill` instead.

Lets try it. Run the ping command.

`docker run busybox ping google.com`

This will keep the container running. Run `docker ps` to get its container id and use that id to stop the container.

`docker stop 3ddc6041a39d`

It may take couple of seconds to stop the server. Now run the ping command again but this time use kill to stop the container.

Docker internally uses kill to stop the process if stop command automatically is unable to in 10 seconds.

**Important Note** You can also give first few characters of the container id so long as it can uniquely identify the container. For instance you could also run the above command as `docker stop 3dd`.

### `docker image ls`

Lists all images in local image cache.

### `docker exec`

Another very useful command. This command runs a command in a running container. The command started using `docker exec` only runs while the container’s primary process is running, and it is not restarted if the container is restarted.

As it says we need to have a running conatiner so start pinging google.com again

`docker run busybox ping google.com`

Find the container id `docker ps`

```
CONTAINER ID   IMAGE     COMMAND             CREATED          STATUS          PORTS                    NAMES
56379bf033ff   busybox   "ping google.com"   27 seconds ago   Up 26 seconds                            upbeat_allen
```

We will use this command to acess

```
docker exec -it 56379bf033ff /bin/sh
```

> `-it` is for interactive terminal

Now try `ls` or `cd`, whatever shell commands you want to try. Whenever you're done enter the command `exit` to leave the shell associated with your container.

### `docker rm`

Removes one or more stopped container. Run `docker ps --all` to get the container id of a stopped container. Use any id to run `docker rm CONTAINERID`

To remove a running conatiner use flag `-f` or `--force`. Go ahead try it.

### `docker system prune`

Don't actually execute this command on our VM, or it will delete our minikube container which we will need in the next lesson.

This will delete all stopped containers and your image cache among other things. If run you will have to redownload images from docker hub the first time they are run.

Run `docker system prune` on the terminal. You will see something like,

```
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N]
```

Be very sure before running this command.
