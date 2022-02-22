# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Intro to Cloud Infrastructure

## Learning Objectives SLIDE 24

_After this lesson, students will be able to:_

- Explain the benefits of adopting a cloud-based infrastructure
- Differentiate between the main service models (SaaS, IaaS, PaaS).

## Lesson Guide

| TIMING | TYPE         | TOPIC                                       |
| :----: | ------------ | ------------------------------------------- |
| 10 min | Activity     | What does cloud infrasturcture mean to you? |
| 10 min | Introduction | Overview                                    |
| 50 min | Lecture      | Concepts and benefits                       |
| 5 min  | BREAK        |                                             |
| 20 min | Lecture      | Cloud Service Models                        |
| 10 min | Activity     | Cloud Service Models                        |
| 15 min | Lecture      | Public vs Private Cloud                     |
| 5 min  | BREAK        |                                             |

> **What does cloud infrastructure mean to you?**:

> Will anyone share their thoughts?

## Overview (10 min)

Cloud infrastructure is the name given to the components needed for cloud computing.
The main harware components of cloud infrastructure are networking equipment, servers and data storage.
Cloud infrastructure also includes a hardware abstraction layer that enables the virtualization of resources and helps to drive down costs through economies of scale.Think of cloud infrastructure as the tools needed to build a cloud. In order to host services and applications in the cloud, you need cloud infrastructure.

## Concepts and benefits (50 min) SLIDE 25

According to the official NIST (National Institute of Standards & Technology) definition, there are five essential characteristics of cloud computing:

- On-demand self-service provisioning of resources
- Broad network access
- Resource pooling
- Rapid elasticity
- Measured service

### Virtualisation revisited / resource pooling

![traditional-vs-virtualisation](../images/trad-vs-virtualisation.png)

Traditionally, servers were stored on-premises and businesses were responsible for maintaining their own servers. This meant that only one application would live on one server. All of the running costs associated with that server were attributed to the single application that it hosted. With the introduction of cloud computing came the concept of virtualisation, essentially splitting a server into many and enabling the hosting of multiple applications on one server. With virtualisation, businesses can share servers and thus, limit the cost of running their applications.

Essentially, virtualisation is a process that allows for more efficient utilisation of physical computer hardware and is the foundation of cloud computing. Benefits include

- Resource Efficiency by running several applications, each on its own VM with its own OS—on a single physical computer
- Easier management by using tools to define configuration
- Minimal downtime by running multiple redundant virtual machines alongside each other and failover between them when problems arise
- Resource Efficiency

> Remember the hypervisor we mentioned in the last lesson? That's what makes this virtualisation possible

**_SLIDE 27_**
[Lets take a look at hypervisors and what they do](https://www.youtube.com/watch?v=FZR0rG3HKIk) (5:20 long)

## Our 5 Characteristics - SLIDE 28

### Access from anywhere

One of our 5 characteristics of cloud computing is broad network access. Broad network access refers to resources hosted in a private cloud network (operated within a company's firewall) that are available for access from a wide range of devices, such as tablets, PCs, Macs and smartphones. These resources are also accessible from a wide range of locations that offer online access.

### Self service and on-demand

A huge benefit of cloud computing is the availability of services. For example, businesses may choose to leverage services from a provider such as

- Authentication
- User management
- Monitoring
- Analytics

The benefits of using such services include leveraging the expertise of the developers who created the software. For small development teams this can be hugely beneficial - rather than spending resources creating an authentication application, developers can use authentication services provided by their cloud provider.

> **Can you think of any more services that may be available in the cloud?**

### Rapid Elasticity

Rapid elasticity allows users to automatically request additional space in the cloud or other types of services. The capabilities of the cloud should appear unlimited to the user. These capabilities should be elastically scalable both horizontally and vertically in accordance with demand, whatever the quantity of resources required, and at any time.

```
Elasticity is basically a ‘rename’ of scalability, which has been a known non-functional requirement in IT architectures for many years already. Scalability is the ability to add or remove capacity, mostly processing, memory, or both, to or from an IT environment when this is needed. This it typically done in two ways:

Horizontal scalability: Adding or removing nodes, servers or instances to or from a pool like a cluster or farm.
Vertical scalability: Adding or removing resources to an existing node, server or instance to increase the capacity of the node, server or instance.
```

[source](https://www.ibm.com/blogs/cloud-computing/2012/09/12/rapid-elasticity-and-the-cloud/)

### Measured service

The NIST talks about measured service as a setup where cloud systems may control a user or tenant’s use of resources by leveraging a metering capability somewhere in the system. The general idea is that in automated remote services, these measurement tools will provide both the customer and the provider with an account of what has been used. In more traditional systems, items like invoices and service change agreements would fill these same roles.

[source](https://www.techopedia.com/definition/14469/measured-service-cloud-computing)

## Cloud Service Models (20 min)

Like pizza, there are many varieties of the cloud. We'll call these "service models."

Sure, you can make pizza from scratch, or you can "take and bake," or you can have it delivered! Let's compare these options to the most common cloud service models.

![pizza](../images/pizza-as-a-service.png)

_We did our best to find the chef of this analogy. We believe [Albert Barron](https://www.linkedin.com/pulse/20140730172610-9679881-pizza-as-a-service) deserves credit._

Let's say we're feeling ambitious, so we're going to make a pizza from scratch. In this service model, we make the dough, add the cheese and toppings, cook it at home, and eat it at our own dining room table. This can be compared to the **traditional on-premise option**, where companies handle it all on their own: the hardware, the software, the management, all of it. (It's not in the diagram above.)

The next service level "up" would be like buying a "take and bake" pizza. The restaurant makes the pizza (composed of dough, cheese, and toppings), but you cook and consume it at home. This cloud service model is called **Infrastructure-as-a-Service (IaaS)** and is the most basic category of cloud computing.

Another step up, and we're getting pizza delivered to our home. The restaurant makes the pizza, cooks it, and delivers it to you. But... you still use your own plates and dining room table. This is called **Platform-as-a-Service (PaaS)**. Services like Amazon Web Services and Heroku are PaaS.

And finally, let's say you're feeling really lazy. You don't want to cook, you don't want to even clean the dishes, so you dine out. Dining out is the equivalent of **Software-as-a-Service (SaaS)**. These applications are typically accessed via the browser and often operate on a subscription model. Examples include messaging services and productivity software.

We don't have a pizza analogy for all examples of cloud computing-based "X-as-a-service." For example, there's Desktop-as-a-Service (DaaS), where you access virtual desktops in the cloud, or Storage-as-a-Service, whose only purpose is to allow you to store, access, and organize data in the cloud.

### Cloud service model activity (10 min)

Let's get into breakout rooms and debate what would be the best option for the following businesses:

- A start-up providing custom made t-shirts online through a custom made website. They have a small team of 3 developers.

- A CMS business with a lots of legacy code. The current product is costly to maintain, using technology such as cold fusion. It's full of bugs and they are losing clients faster than the sales team can on-board new clients. They need to change and they need to do it fast.

- An e-commerce store who are looking to invest in their tech and future-proof their offering.

## Public vs Private Cloud

[Watch this video to learn the differences between private and public clouds, and some scenarios that each may be required](https://www.youtube.com/watch?v=vcJecQDfH9U)

---
