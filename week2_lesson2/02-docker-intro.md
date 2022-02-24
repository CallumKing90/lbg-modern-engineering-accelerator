# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Intro to Docker

### Learning Objectives

- Explain the problems that Docker solves.
- Differentiate between VMs and containers.
- Explain how a Docker image relates to a container.
- Describe how Docker works at a high level.
- Identify when (and when not) to use Docker.

## Lesson Overview

| Topic                | Type     | Timing |
| -------------------- | -------- | ------ |
| Opening              | Opening  | 5 min  |
| Why use Docker?      | Lecture  | 10 min |
| How's Docker Work?   | Lecture  | 15 min |
| Research             | Exercise | 15 min |
| What is a Container? | Lecture  | 15 min |
| Debate and Defend    | Exercise | 20 min |

total 1hr 20mins

## Opening (5 min)

![whales!](https://www.brianweet.com/assets/docker-blog-1/docker-logo.png)

Docker is a tool designed to make it easier to create, deploy, and run applications by using **containers**. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one component. The container becomes the unit for distributing and testing your application.

We know that's a bit of mumbo jumbo, so let's see what that actually means.

## The Problems Docker Solves (10 min)

Let's tell a little story.

In the olden days of [Web 2.0](https://en.wikipedia.org/wiki/Web_2.0) (basically, the early 2000s), there was a huge difference between the machine that a developer used to build an app and what was used to deploy that app. It took days, if not weeks, to "provision" or build a computer with the right hardware and software to deploy an app. More often than not, an app that was built on a developer's machine did not work properly in production. These issues could range from the dependencies not connecting, to a different operating system, to versioning problems... or worse.

Or, to put it another way:

![meme](https://static.packt-cdn.com/products/9781787286986/graphics/B06455_07_01.jpg)

### One New Way

Things started getting a bit better when **virtual machines** were introduced.

In computing, a virtual machine (VM) is an emulation of a computer system. Virtual machines are based on computer architectures and provide the functionality of a physical computer. VMs can keep applications on the same hardware completely separate.

VMs work because they reduce conflicts among software components and minimize competition for hardware resources. However, they're bulky (each machine requires its own operating system), difficult to maintain, and use up a lot of storage and resources.

### The BETTER New Way

While VMs are still used by many companies, other developers kept trying to make things better.

Enter containers.

![](https://external-preview.redd.it/aR6WdUcsrEgld5xUlglgKX_0sC_NlryCPTXIHk5qdu8.jpg?auto=webp&s=5fe64dd318eec71711d87805d43def2765dd83cd)

In contrast to VMs, containers isolate applications’ execution environments _but_ share the underlying operating system kernel. They use far fewer resources than VMs and start up almost immediately. What's more, they can be packed far more densely on the same hardware and spun up and down en masse with far less effort and overhead.

> **Knowledge Check**: Does anyone know what we mean by an operating system "kernel"?

Containers are an efficient, granular tool for combining software into enterprise-level applications and services.

The illustration below comes from Docker and shows a VM on the left and a container on the right.

> **Knowledge Check**: Let's play that game where you spot the differences between the two images. What's different in a container? Why do you think that's important?

![container vs VM](https://images.idgesg.net/images/article/2017/06/virtualmachines-vs-containers-100727624-large.jpg)

## How's Docker Work? (15 min)

Docker is an open-source platform (the most popular one) for building applications using containers.

However, Docker isn't a completely new technology. Many of the components and principles existed previously. Docker is written in Go and takes advantage of several features of the Linux kernel to deliver its functionality, including namespaces and cgroups (more on those in the Additional Resources section).

The ultimate goal of Docker is to mirror our dev environment with our production environment. This is mostly useful for your back-end but can be applied to your front-end applications as well! It's cool to run Docker locally, but its real benefit comes into play while running it on production machines.

Take a look at this _very_ simplified version of how Docker works.

> **Knowledge Check**: Can someone explain what's going on here?

![diagram](https://blog.octo.com/wp-content/uploads/2014/01/Diapositive1.png)

### The Main Components of Docker

OK, yes, the short answer is "containers," but those don't just grow on trees. Where do containers come from, you might ask? Let's find out!

**The High Level**

`Dockerfile --> Image --> Container --> Docker Engine --> *chef kiss emoji*`

**The Details**

- **Dockerfile**: Instructions to create an image (more on those later).

  - Specifies the OS, languages, etc.
  - Explains what the container will do when it's run.
  - You can create your own or use premade ones.

- **Image**: A blueprint to build a container.

  - A portable file system that may contain files for the OS, framework files, and the files for an app.
  - Tells each component what to do and when.
  - Containers can share image layers, making them very efficient.

- **Container**: You already know this! An isolated instance created from an image, running the app on whatever OS you have.

- **Docker Engine**: Integrates with the OS to run the Docker containers; sits directly on top of the OS. It's very fast and inexpensive.

  - **Docker Daemon**: The Docker daemon (dockerd) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. It does the heavy lifting and is a part of the Docker engine.
  - **Docker Client (CLI)**: The CLI uses Docker APIs to control or interact with the Docker daemon through scripting or direct CLI commands.

- **Docker Desktop**: A native application for MacOS and Windows machines that provides an easy-to-use development environment for building, shipping, and running dockerized apps.

In this course, we'll also be using **Docker Compose**, a tool for simplifying the process of developing and testing multi-container applications. We'll cross that bridge when we come to it!

## Activity: Learning by Teaching (15 min)

**_ Breakout rooms: groups of 4 _**

Teaching a new concept you just learned can help you to develop a better understanding of that concept and also helps with knowledge retention. In your group, have each person choose one of the following topics. Then spend 5-10 minutes to research that topic individually.

- Docker image
- Container
- Dockerfile
- Docker Hub

When everyone is ready, present what you learned to others in your group.

## What is a Container (15 min)

Operating systems have something called a kernel. This kernel is a running software process that governs access to all the programs, different programs like Chrome, terminal etc. A kernel has complete control over everything in the system.

Lets say Chrome sends a system call to the kernel to read information from the hard drive. And the kernel based on where the request is coming from and what it needs redirects the request to the appropriate section of the hard drive. This entire process of segmenting a resource based on the process that is asking for it is called **namespacing**.

![](https://codeahoy.com/img/dockercontainers/containers-on-box.png)

This is what a container is based on. A container is not a physical construct that exists inside your computer. Instead it is a process or set of processes that have a grouping of resources specifically assigned to it. Resources like memory, RAM, CPU, network.

### How is an Image Related to a Container?

As mentioned earlier, a Docker image is nothing more than a filesystem snapshot, a set of directories and files. For instance, in an image of Chrome, there will be files that Chrome needs to run and a specific startup command that actually runs Chrome. The kernel will isolate a section of the hard drive and make it available to just the running container.

So when you run a container from an image, the filesystem snapshot of that image is placed into a section of the hard drive that can only be accessed by the running container. In our case, when the startup command executes it will start Chrome and only utilize the resources that are segmented specifically for this container.

**Interesting Note:** Only the Linux operating system uses a kernel and namespacing. So how do Windows and macOS machines use Docker then? A Linux virtual machine is installed as part of the Docker installation. As long as Docker is running it also runs a Linux VM. All of your containers will be created inside of this VM and it hosts a Linux kernel that limits access and segments resources for the different containers.

Run `docker version` on the terminal. You'll see the OS as Linux.

```
$ docker version
Client: Docker Engine - Community
 Cloud integration: 1.0.12
 Version:           20.10.5
 API version:       1.41
 Go version:        go1.13.15
 Git commit:        55c4c88
 Built:             Tue Mar  2 20:13:00 2021
 OS/Arch:           darwin/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.5
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.13.15
  Git commit:       363e9a8
  Built:            Tue Mar  2 20:15:47 2021
  OS/Arch:          linux/amd64
  Experimental:     true
 containerd:
  Version:          1.4.4
  GitCommit:        05f951a3781f4f2c1911b05e61c160e9c30eaa8e
 runc:
  Version:          1.0.0-rc93
  GitCommit:        12644e614e25b05da6fd08a38ffa0cfe1903fdec
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

## Activity: Debate and Defend (20 min)

These days in the developer world, Docker feels a little bit like this:

![meme2](https://i.imgur.com/pgSrnRE.png)

But, like anything, Docker isn't right for every situation. So let's think things through!

I'm going to split half the room into "Pro Docker" and half the room into "No Docker."

Take the next 5–10 mins in your group to do some research to support your argument. Look for:

- The benefits/drawbacks of Docker.
- Types of apps or businesses for which Docker is best suited.
- Examples of businesses that use (or don't use) Docker.

Then, we'll host the Great Docker Debate and hear from both sides!

<!--**Instructor Note**: Give teams time to research the pros and cons of Docker and then have each side present for a few minutes. There doesn't need to be a "winner" in the debate — the point is more to explore the pros and cons of each side, especially because Docker is SO popular and everyone is crazy about it right now.-->

## Conclusion

Before we get to installing and using Docker, let's take a moment to recap.

<!--**Instructor Note**: Lead discussion with the class.-->

1. What's a container?
2. How does Docker work?
3. Why is Docker so popular right now?
4. What is Docker Hub?

## Additional Resources

- [Docker Underlying Technology](https://docs.docker.com/engine/docker-overview/#the-underlying-technology)
- [Wikipedia: Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)
- [Cgroups](https://en.wikipedia.org/wiki/Cgroups)
