Firstly, lets address an issue that may occur when trying out this tutorial. If after starting 2 containers (there will be a prompt in the instructions to check this) you only have a `jenkins-docker` container running and not a `jenkins-blueocean` container, please run the following commands:

```sh
docker image prune
```

type `y` to agree to delete then:

```sh
docker container prune
```

type `y` to agree to delete then:

```sh
docker system prune
```

type `y` to agree to delete.

This should delete everything from docker (the cause of the crashing container is a corrupted jenkins file in a download) so when running the commands again it will re-download and [hopefully] not be corrupted.

# Run Jenkins in Docker

In this tutorial, you’ll be running Jenkins as a Docker container from the `jenkins/jenkins` Docker image.

You can read more about Docker container and image concepts in the [Docker](https://www.jenkins.io/doc/book/installing/docker/) section of the [Installing Jenkins](https://www.jenkins.io/doc/book/installing/) page.

1. Open up a terminal window.
2. Create a [bridge network](https://docs.docker.com/network/bridge/) in Docker using the following docker network create command:

```sh
docker network create jenkins
```

You can check all of the running networks within docker using

```sh
docker network ls
```

or check out some similar network related commands using

```sh
docker network --help
```

3. In order to execute Docker commands inside Jenkins nodes, download and run the docker:dind Docker image using the following docker run command:

```sh
docker run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 3000:3000 \
  --publish 2376:2376 \
  docker:dind \
  --storage-driver overlay2
```

Virtual Box will prompt about an unsafe paste due to some commands being run as sudo. This is fine! We are superusers, so paste away 🙂

4. Customise official Jenkins Docker image, by executing below two steps:

- Create a project directory called jenkins on your desktop and inside there, create a Dockerfile with the following content:

```yaml
FROM jenkins/jenkins:2.303.3-jdk11
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
https://download.docker.com/linux/debian \
$(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean:1.25.1 docker-workflow:1.26"
```

- use the terminal to navigate into your newly create jenkins directory and build a new docker image from this Dockerfile and assign the image a meaningful name, e.g. "myjenkins-blueocean:1.1":

```sh
docker build -t myjenkins-blueocean:1.1 .
```

5. Run your own myjenkins-blueocean:1.1 image as a container in Docker using the following docker run command:

```sh
docker run \
  --name jenkins-blueocean \
  --rm \
  --detach \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  --volume "$HOME":/home \
  myjenkins-blueocean:1.1
```

## CHECK YOUR CONTAINERS!

```sh
docker ps
```

you should have 2 containers running at this point, the names of them will be `jenkins-docker` and `jenkins-blueocean`

If you do not have `jenkins-blueocean` please see the instructions at the top of this file and then run the commands again from the start.

## Setting up Jenkins

Before you can access Jenkins, there are a few quick "one-off" steps you’ll need to perform.

### Unlocking Jenkins

When you first access a new Jenkins instance, you are asked to unlock it using an automatically-generated password.

1. If you have both `jenkins-docker` and `jenkins-blueocean` running as containers, browse to http://localhost:8080 and wait until the Unlock Jenkins page appears.

![docker login](../images/docker-login.png)

2. We need to find the password to log into jenkins.

```sh
docker logs jenkins-blueocean
```

The above command will retrieve the logs from the `jenkins-blueocean` container. In those logs is the password!

![jenkins password](../images/jenkins-password.png)

Copy the password and paste it into the password box in the jenkins UI.

After unlocking Jenkins, you'll get the customisation screen, let's go ahead and install suggested plugins. This could take a few seconds or a few minutes. Hold tight.

### Creating an admin user

Jenkins will ask you to create an admin user - go ahead and create a user - note down your admin user credentials!

Save the user. If Jenkist says `Jenkins is almost ready!` click `Restart`. Otherwise, save and continue!

### Stopping and restarting Jenkins

Throughout the remainder of this tutorial, you can stop your Docker container by running:

```sh
docker stop jenkins-blueocean jenkins-docker
```

To restart your Docker container, repeat the docker run commands above.

### Fork and clone the sample repository

Obtain the simple "Welcome to React" Node.js and React application from GitHub, by forking the sample repository of the application’s source code into your own GitHub account and then cloning this fork locally.

1. Make sure you're signed into your GA enterprise account.
2. Fork the [simple-node-js-react-npm-app](https://git.generalassemb.ly/tristanhall/simple-node-js-react-npm-app) on GitHub into your GitHub account. If you need help with this process, refer to the Fork A Repo documentation on the GitHub website for more information.
3. Clone your forked `simple-node-js-react-npm-app` repository (on GitHub) locally to your machine.

### Create your Pipeline project in Jenkins

1. Go back to Jenkins, log in again if necessary and click create new jobs under Welcome to Jenkins!
   Note: If you don’t see this, click New Item at the top left.
2. In the Enter an item name field, specify the name for your new Pipeline project (e.g. `simple-node-js-react-npm-app`).
3. Scroll down and click Pipeline, then click OK at the end of the page.
4. (Optional) On the next page, specify a brief description for your Pipeline in the Description field (e.g. An entry-level Pipeline demonstrating how to use Jenkins to build a simple Node.js and React application with npm.)
5. Click the Pipeline tab at the top of the page to scroll down to the Pipeline section.
6. From the Definition field, choose the Pipeline script from SCM option. This option instructs Jenkins to obtain your Pipeline from Source Control Management (SCM), which will be your locally cloned Git repository.
7. From the SCM field, choose Git.
8. In the Repository URL field, to your github enterprise repository above. (the one in the url on your browser, not the git address).
9. You'll need to add a credential. From the dropdown menu, choose the `Jenkins Credential` option. This will open up a new popup window.
10. The kind of credential we want to use is an `SSH Key with Username`.
11. Enter your github enterprise username in the Username field.
12. Copy your SSH you can see this in the terminal by running:

```sh
cat ~/.ssh/id_ed25519.pub
```

You'll need to click the radio button to allow you to enter the key manually and then click `add` on the right hand side of the text box. 9. Click Save to save your new Pipeline project. You’re now ready to begin creating your Jenkinsfile, which you’ll be checking into your Git repository.

### Create your initial Pipeline as a Jenkinsfile

You’re now ready to create your Pipeline that will automate building your Node.js and React application in Jenkins. Your Pipeline will be created as a Jenkinsfile, which will be committed to your cloned Git repository (simple-node-js-react-npm-app).

This is the foundation of "Pipeline-as-Code", which treats the continuous delivery pipeline as a part of the application to be versioned and reviewed like any other code. Read more about Pipeline and what a Jenkinsfile is in the Pipeline and Using a Jenkinsfile sections of the User Handbook.

First, create an initial Pipeline to download a Node Docker image and run it as a Docker container (which will build your simple Node.js and React application). Also add a "Build" stage to the Pipeline that begins orchestrating this whole process.

1. Using VS Code, create and save new text file with the name `Jenkinsfile` at the root of your local `simple-node-js-react-npm-app` Git repository.
2. Copy the following Declarative Pipeline code and paste it into your empty Jenkinsfile:

```groovy
pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
```

This image parameter (of the agent section’s docker parameter) downloads the node:lts-buster-slim Docker image (if it’s not already available on your machine) and runs this image as a separate container. This means that:

- You’ll have separate Jenkins and Node containers running locally in Docker.
- The Node container becomes the agent that Jenkins uses to run your Pipeline project. However, this container is short-lived - its lifespan is only that of the duration of your Pipeline’s execution.

- This args parameter makes the Node container (temporarily) accessible through port 3000. The significance of this is explained in the jenkins/scripts/deliver.sh file of your cloned repository, and is covered in a subsequent section of this tutorial.
- Defines a stage (directive) called Build that appears on the Jenkins UI.
- This sh step (of the steps section) executes the npm command to ensure that all dependencies required to run your application have been downloaded to the node_modules workspace directory (within the /var/jenkins_home/workspace/simple-node-js-react-npm-app directory in the Jenkins container).

Save your edited `Jenkinsfile` and commit and push your changes to your `simple-node-js-react-npm-app` Git repository. E.g. Within the `simple-node-js-react-npm-app` directory, run the commands:

```sh
git add .
```

then

```sh
git commit -m "Add initial Jenkinsfile"
```

then

```sh
git push
```

Go back to Jenkins again, log in again if necessary and click Open Blue Ocean on the left to access Jenkins’s Blue Ocean interface.

In the This job has not been run message box, click Run, then quickly click the OPEN link which appears briefly at the lower-right to see Jenkins building your Pipeline project. If you weren’t able to click the OPEN link, click the row on the main Blue Ocean interface to access this feature.

**_ Note:_** You may need to wait several minutes for this first run to complete. After making a clone of your `simple-node-js-react-npm-app` Git repository itself, Jenkins:

- Initially queues the project to be run on the agent.

- Downloads the Node Docker image and runs it in a container on Docker.

![react app 1](../images/react-1.png)

Runs the Build stage (defined in the Jenkinsfile) on the Node container. During this time, npm downloads many dependencies necessary to run your Node.js and React application, which will ultimately be stored in the node_modules workspace directory (within the Jenkins home directory).

![react app 2](../images/react-2.png)

The Blue Ocean interface turns green if Jenkins built your Node.js and React application successfully.

![react app 3](../images/react-3.png)

Click the X at the top-right to return to the main Blue Ocean interface.

![react app 4](../images/react-4.png)

### Add a test stage to your Pipeline

1. Go b ack to your text editor/IDE and ensure your Jenkinsfile is open.
2. Update your Jenkinsfile to look like this:

```groovy
pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
    }
}
```

- The environment directive sets the environment variable CI with a boolean value of true, which is available to all steps in this Pipeline. When the npm test command in test.sh (which is run during the Test stage defined further down the Pipeline) detects the environment variable CI with a value of true, then this command is run in "non-watch" (i.e. non-interactive) mode. In "watch" mode, npm test expects user input, which can pause running builds of CI/CD applications indefinitely. As an alternative to specifying the environment directive in a Jenkins Pipeline, you could also specify this environment variable in the package.json file (to pass on to the npm test command) by:

  - Uncommenting the npm install --save-dev cross-env command in jenkins/scripts/test.sh (to install the cross-env dependency during the Test stage). Read more about this in the test.sh file itself.

  - Updating the following line in the package.json file (at the root of the simple-node-js-react-npm-app repository) from:

    - "test": "react-scripts test --env=jsdom"
    - to:
    - "test": "cross-env CI=true react-scripts test --env=jsdom",

  - Defines a stage (directive) called Test that appears on the Jenkins UI.
  - This sh step (of the steps section) runs the shell script test.sh located in the jenkins/scripts directory from the root of the simple-node-js-react-npm-app repository. Explanations about what this script does are covered in the test.sh file itself. As a general principle, it’s a good idea to keep your Pipeline code (i.e. the Jenkinsfile) as tidy as possible and place more complex build scripting steps into separate shell script files like the test.sh file. This ultimately facilitates the maintenance of your Pipeline, especially if it gains more complexity.

- Save your edited Jenkinsfile and commit it to your simple-node-js-react-npm-app Git repository. E.g. Within the simple-node-js-react-npm-app directory, run the commands:
  git stage .
  then
  git commit -m "Add 'Test' stage"
- Go back to Jenkins again, log in again if necessary and ensure you’ve accessed Jenkins’s Blue Ocean interface.
- Click Run at the top left, then quickly click the OPEN link which appears briefly at the lower-right to see Jenkins running your amended Pipeline project. If you weren’t able to click the OPEN link, click the top row on the Blue Ocean interface to access this feature.
  Note: You’ll notice from this run that Jenkins no longer needs to download the Node Docker image. Instead, Jenkins only needs to run a new container from the Node image downloaded previously. Also, from now on, no (new) npm dependencies should need to be downloaded during the "Build" stage. Therefore, running your Pipeline this subsequent time should be much faster.
  If your amended Pipeline ran successfully, here’s what the Blue Ocean interface should look like. Notice the additional "Test" stage. You can click on the previous "Build" stage circle to access the output from that stage.

![react app 5](../images/react-5.png)

Click the X at the top-right to return to the main Blue Ocean interface.

### Add a final deliver stage to your Pipeline

- Go back to your text editor/IDE and ensure your Jenkinsfile is open.

- update your Jenkinsfile to:

```groovy
pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
```

- Save your edited Jenkinsfile and commit it to your simple-node-js-react-npm-app Git repository. E.g. Within the simple-node-js-react-npm-app directory, run the commands:

```sh
sh git stage .
```

then

```sh
git commit -m "Add 'Deliver' stage"
```

- Go back to Jenkins again, log in again if necessary and ensure you’ve accessed Jenkins’s Blue Ocean interface.

- Click Run at the top left, then quickly click the OPEN link which appears briefly at the lower-right to see Jenkins running your amended Pipeline project. If you weren’t able to click the OPEN link, click the top row on the Blue Ocean interface to access this feature.
  If your amended Pipeline ran successfully, here’s what the Blue Ocean interface should look like. Notice the additional "Deliver" stage. Click on the previous "Test" and "Build" stage circles to access the outputs from those stages.

![react app 6](../images/react-6.png)

Ensure you are viewing the "Deliver" stage (click it if necessary), then click the green `./jenkins/scripts/deliver.sh` step to expand its content and scroll down until you see the `http://localhost:3000` link.

![react app 7](../images/react-7.png)

Click the `http://localhost:3000` link to view your Node.js and React application running (in development mode) in a new web browser tab. You should see a page/site with the title Welcome to React on it.
Tip: If you’re feeling a little adventurous, you can try accessing the terminal/command prompt of your Jenkins Docker container, then using vi editor, tweak and save the `App.js` source file and see the results appear on the Welcome to React page. To do this, run the following commands:

```sh
docker exec -it <docker-container-name> bash
cd /var/jenkins_home/workspace/simple-node-js-react-npm-app/src
vi App.js
```

- This command provides access to the terminal/command prompt of your Jenkins Docker container. The <docker-container-name> can be obtained using the command docker ps. Otherwise, it would be jenkins-tutorials (if you specified this in the command you used to run this container above - i.e. --name jenkins-tutorials).
- Once in the container, change directory to the Node.js and React source directory (in the Jenkins workspace directory within Jenkins home).
- Access, edit and save changes to your application’s App.js file using vi editor.

When you are finished viewing the page/site, click the Proceed button to complete the Pipeline’s execution.

![react app 8](../images/react-8.png)

Click the X at the top-right to return to the main Blue Ocean interface, which lists your previous Pipeline runs in reverse chronological order.

![react app 9](../images/react-9.png)

### Wrapping up

Well done! You’ve just used Jenkins to build a simple Node.js and React application with npm!

The "Build", "Test" and "Deliver" stages you created above are the basis for building more complex Node.js and React applications in Jenkins, as well as Node.js and React applications that integrate with other technology stacks.

Because Jenkins is extremely extensible, it can be modified and configured to handle practically any aspect of build orchestration and automation.
