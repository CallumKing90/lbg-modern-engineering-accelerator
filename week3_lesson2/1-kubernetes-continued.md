## Scaling without disruption

You may be wondering at this point how Kubernetes can add or remove pods and containers whenever it wants without affecting the consumers of your application.

What happens if a customer is making a request that gets routed to a container which Kubernetes decides to terminate?

The answer to this lies in the clever use of services and load balancing.

### Services

Services are the main component Kubernetes uses for routing. They act as an endpoint for DNS and as a load balancer within a cluster.

Let's say you have an API - `api.mycompany.com` and the DNS for this domain is registered with a service called **API**.

We create a deployment which tells Kubernetes to run 3 pods for that service.

Under the hood Kubernetes will start 3 pods, each having a single container running in them. Each of those containers will get an internal IP address for traffic to be routed to. For example let's say the containers have the IP addresses `10.0.0.1`, `10.0.0.2` and `10.0.0.3` and each container is running the application on port `5000`.

The service in Kubernetes will have these 3 IP addresses registered as routing addresses for requests coming in.

The routing table will look something like this:

| IP       | Port |
| -------- | :--- |
| 10.0.0.1 | 5000 |
| 10.0.0.2 | 5000 |
| 10.0.0.3 | 5000 |

When a request for `api.mycompany.com` makes it's way to the service, the service will route it to one of the three IP address and port combinations it has registered and it will be served by a container running at that address.

### Something goes wrong

Unfortunately there's a memory leak with our application, and `10.0.0.3` starts to show signs of becoming slower, unresponsive and requests start failing. Kubernetes notices this from the liveness health check. Under the hood Kubernetes will start draining any HTTP connections to `10.0.0.3`, making sure any existing ones complete without allowing new ones to start.

Once all of the HTTP connections have been finished, it will then stop routing traffic to `10.0.0.3`, instead choosing to route only to `10.0.0.1` and `10.0.0.2`.

For a short while we'll have reduced capacity as only 2 containers will be serving our traffic. However we will reduce the number of failing requests because our existing healthy containers can still serve them.

During this time the route table will look like this:

| IP                     | Port               |
| ---------------------- | ------------------ |
| 10.0.0.1               | 5000               |
| 10.0.0.2               | 5000               |
| ~~10.0.0.3~~ (Deleted) | ~~5000~~ (Deleted) |

While this is happening Kubernetes is starting up a new container with the IP address `10.0.0.4` and is waiting for it to start. Once it's readiness check has completed the IP address will be added to the routing table for the service and requests will start being routed to it.

The new routing table will then look like this:

| IP       | Port |
| -------- | ---- |
| 10.0.0.1 | 5000 |
| 10.0.0.2 | 5000 |
| 10.0.0.4 | 5000 |

The unresponsive container `10.0.0.3` will be asked politely by Kubernetes to shut down by sending a `SIGTERM` command and it'll be given a grace period to stop any work it's doing and exit gracefully. If the container has still not exited after the grace period then Kubernetes will assume it has become completely unresponsive and will send it a `SIGKILL` instead. This will terminate the process immediately and free up any resources it was using on the cluster.

And that is how Kubernetes minimises disruption to the consumers of our applications.

## Kubernetes pros and cons

Kubernetes isn't for everyone. Some companies will set up a cluster and realise that it does require a lot of effort to maintain and manage. Sometimes companies like this might be better off trying alternative solutions.

Here are some pros and cons of using Kubernetes:

### Pros

- Extremely powerful
- Extensible and pluggable architecture
- Allows containerised applications to scale seamlessly

### Cons

- Very complicated to set up and maintain
- Complicated to secure
- Managing the cluster can be a full time job in larger organisations
- Requires specialists to use and maintain
- Updating a kubernetes cluster can be very involved and scary

## Managed vs unmanaged Kubernetes

One of the things that most people discover when starting to work with Kubernetes is the huge complexity involved. Kubernetes is huge, it does many, many complex things and can be very scary when first starting out.

Most companies that use Kubernetes have specialists whose sole purpose is to maintain the Kubernetes cluster. It requires lots of training to become comfortable with managing a cluster on the scale that most companies require.

If you are going to try Kubernetes it can be worth trying one of the managed Kubernetes services by some of the major cloud providers, such as:

- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/)
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
- [DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes/)

These managed clusters are pre-installed and ready to go. They can help take out some of the initial teething issues you might face when learning Kubernetes.

## Minikube

Minikube is a version of Kubernetes that runs on your local machine for development purposes. It's a single node cluster that runs on Windows, Linux and MacOS.

It helps developers build applications for Kubernetes without requiring a full cluster. They can build and test locally using Minikube.

We'll be using Minikube in our practical lesson to help simulate a real Kubernetes cluster.
