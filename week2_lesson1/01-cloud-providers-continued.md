# Cloud Providers Continued

In the last lesson, we looked at github and various actions such as creating repositories, pulling and pushing code, creating branches, merging branches and dealing with merge conflicts.

Any questions?

Then we looked at a brief intro to the cloud and what it is - let's continue that now:

## Activity: Considerations and potential blockers (15)

> **Group Activity**: In break-out rooms, discuss: What are the potential blockers a business might find when considering moving to the cloud.

There can be many blockers on the road to the cloud and migrations need to be carefully planned and considered. Let's have a look at a few potential blockers:

- Legacy systems
  – is anything holding you back?
- Do you have the skills required?
  - Does your team have the skills and the new mindset required?
- Regulations
  - will you experience problems with regulatory requirements, such as where your clients require their data to be stored?
- Cloud governance and change control
  - how will you find a balance of business agility and control?
- Ongoing management
  - how will you support your day-to-day operations? Internal/Outsource
- Service optimisation and monitoring
  - how will you monitor your cloud spend and optimise it?

## How Is This Possible? (15 min) - Slide 6

There are two key concepts here:

- Virtualization
- Containerization

### Virtualization

Virtualization is the division of _physical_ computing resources. It's what makes cloud computing possible.

Through software called a _hypervisor_, virtualization slices the physical resources of a server (such as the RAM, CPU, and storage) and turns them into virtual resources. It's the technology that we are using right now to split the resources of your laptops to run the Virtual Box machines for this course.

A physical server that's running a hypervisor is referred to as a virtual **host**.

Virtual **guests** run on a virtual host that provides all of the physical resources to the virtual machine to run the operating system and applications. As far as these applications and the OS are concerned, they are not aware if they are running on a VM or an actual physical server.

A **virtual machine** (VM) is a software-based instance of a physical server running on a hypervisor where a guest operating system has access to emulated virtual hardware.

### Containerization

So, how does containerization relate to virtualization?

A container is operating system-level virtualization where the OS kernel provides isolated user spaces to run specific applications.

Instead of slicing physical resources, a container engine such as Docker slices operating system resources: process namespace, the network stack, the storage stack, and file system hierarchy. Every container gets its process IDs and root file system. As a result, containers are much more lightweight than VMs.

![vm-containers](../images/vms-containers.png)
[Source](https://www.docker.com/what-container#/package_software)

We'll spend a lot more time talking about containers when we get into Docker and microservices, but they're also important in supporting cloud computing.

**_SLIDE 10_**

<details>
	<summary>Check: What is the biggest difference between virtualization and containerization?</summary>

- In a **virtualized** environment, each virtual machine has its own guest OS.
- In a **containerized** environment, the operating system lives on the physical server and the OS resources are split across each container.

</details>

---

## What Makes It So Great? (15 min) SLIDE 11 & 12 **_BREAKOUT ROOMS 5 mins_**

![](https://i.pinimg.com/originals/13/6b/92/136b92a8550aa80530ebc0aa02ba1c24.gif)

Go back to your partner and brainstorm: Why do people get so excited about the cloud? What benefits does it provide for companies? Discuss for a few minutes and then we'll popcorn out as a group.

Here are some key benefits:

### Elasticity

The cloud provides **elasticity**, allowing companies to scale resources up and down quickly.

Think of buying a car versus renting one. If you buy a car, you're saddled with the expense until you pay it off. If you rent a car, you commit to paying for it as long as you want to use it; once you've paid for that use, you have no further obligation to pay! You only pay for what you use, just like with your water service or electrical utility.

> **Knowledge Check**: What kinds of business might benefit from elasticity?

### Scalability

It is **scalable**. Cloud infrastructure scales much more quickly than onsite infrastructure.

> “With a capex model (owning the hardware onsite) it was a question of putting your finger in the air to anticipate shifting storage requirements. Now we can see what we need immediately and accommodate changes very easily in the most cost-effective manner.”
> (_Paul Brown, IT Director for Infrastructure and Support, Cordant Group_. [Source](https://cloud.netapp.com/hubfs/success-stories/Cordant.pdf).)

### It's a Service

This is especially beneficial for smaller companies that may not have the required technical support onsite. Servers can be provisioned in a matter of a few clicks and disposed of just as easily. Cloud providers boast better uptimes than most businesses.

> “By switching to the AWS Cloud, our uptimes went from around 95 percent to 99.999 percent. We no longer run the risk of downtime impacting revenues.”
> (_Jinwei Lin, Assistant Manager, SETTour_. [Source](https://aws.amazon.com/solutions/case-studies/settour/).)

---

## Let's dive in (35 min)

Who are the main contenders in the world of cloud computing?

- AWS
- Microsoft Azure
- Google Cloud
- Alibaba Cloud
- Oracle
- IBM
- Salesforce
- Hewlett Packard Enterprise
- Cisco Systems
- Dell Technologies/VMware

> **Knowledge check**: who was the first cloud computing provider?

> "On August 25, 2006, Amazon Web Services launched Elastic Compute Cloud (EC2), enabling people to rent virtual computers and use their own programs and applications online"

There are many cloud providers available on the market and all have a somewhat similar offering, however they have subtle differences in their offerings. Let's take a look at a few:

**_SLIDE 18_**
**_15 mins_** In breakout rooms, research a cloud provider and build a case for using (or alternatively **_not_** using) that provider within Lloyds.
[Further reseach on Azure](https://www.youtube.com/watch?v=47rK-xLG_88)

- group 1 - AWS
- group 2 - Microsoft Azure
- group 3 - Google Cloud
- group 4 - Cisco Systems
- group 5 - Oracle
- group 6 - IBM

### Serverless computing

AWS' Lambda service leads the way in serverless computing due to supporting every programming language with its Runtime API, integrating with dozens of AWS services natively, or with other monitoring, visibility, and security tools via AWS Lambda Extensions. Presently, AWS is the only provider in our cloud services comparison to offer Provisioned Concurrency in order to keep functions initialized and hyper-ready to respond to an event.

### VMs

Storage optimized vms are ideal for big data so lets look at these as an example of how providers differ:

AWS and Azure are fairly similar in their ranges of Storage Optimized VMs—respectively offering 7.625GiB and 8GiB of memory per vCPU. Google doesn’t offer a designated Storage Optimized VM option, but instead allows you to add one of the following to an existing VM:

- Zonal Standard (HDD) Persistent Disks
  - slow but cheap, better suited to data processing workloads that primarily use sequential I/Os
- Regional Standard Persistent Disks
  - same as above but with synchronous replication across two zones in a region
- Zonal Balanced Persistent Disks
  - suitable for most general purpose applications at a price point between that of standard and SSD persistent disks.
- Regional Balanced Persistent Disks
  - above but with synchronous replication across two zones in a region
- Zonal SSD Persistent Disks
  - faster and more suitable for enterprise applications and high-performance database workloads
- Regional SSD Persistent Disks
  - suitable for workloads that may not have application-level replication
- Local SSD Disks
  - have much higher throughput and lower latency

Google’s approach gives more choice over how VMs are configured for storage, but there are tradeoffs. For example, Local SSD storage isn't automatically replicated and all data on the Local SSD may be lost if the Virtual Machine is terminated for any reason. You can add up to 24 Local SSD Drives with 375GiB of storage to each VM for a total of 9TiB of storage per VM.

[Source](https://www.cloudhealthtech.com/blog/cloud-services-comparison)

### Containers

As with the VM modeling, different cloud providers will have different offerings when it comes to containerisation.

While AWS will provide Amazon Elastic Kubernetes Service, Amazon Elastic Container Service and Fargate, Azure provide Azure Kubernetes Service. Azure Container Service was retired as a standalone service in January 2020.

### Pricing

All providers have slightly different pricing models

### Developer experience

A large proportion of developers will lean towards a certain provider based on the user/developer experience. The ease and speed of setting up services through a well developed UI is important.

## Conclusion (5 min)

Remember when we asked you to define and describe several aspects of the cloud? Well, now you should be able to answer all of these questions:

- What are the drivers?
- What are the blockers?
- What is the cloud?
- How does it work?

#### Resources

- [Why migrate?](https://www.chorus.co/resources/news/why-migrate-to-the-cloud-now)
- [More on considerations and potential blockers](https://www.chorus.co/resources/news/ten-key-considerations-for-migrating-to-the-cloud)
- [Comparisson of providers](https://www.cloudhealthtech.com/blog/cloud-services-comparison)
- [More on the Financials](https://www.cio.com/article/2430099/capex-vs--opex--most-people-miss-the-point-about-cloud-economics.html)
