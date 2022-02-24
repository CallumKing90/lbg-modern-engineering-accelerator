| TIMING | TYPE    | TOPIC                                         |
| :----: | ------- | --------------------------------------------- |
| 50 min | Lecture | [12 Factor App Design](https://12factor.net/) |

## 12 Factor App Design (50 min)

The 12 Factor App is a methodolody developed by the team at Heroku in 2012. It defines a set of rules (known as the 12 Factor App Principles) to follow when building SaaS applicaitons.

The rules encourage developers to keep the following goals in mind during development:

- To avoid the cost of software erosion
- To control the dynamics of organic growth of an app over time
- To Improve collaboration between developers working on same app’s codebase
- To raise awareness of systemic problems that occur in modern

![12-factor-app](../images/12-factor.png)

Let's dive into each of the principles to understand them.

1. Codebase

- Each application should have a single codebase. However, deploying to multiple environments is possible.
- If an application has multiple codebases, it violates the methodology and becomes known as a `distributed system`.
- But, each component in a distributed system is an app and can comply with the 12-Factors.

![12-factor-codebase](../images/12-factor-codebase.jpeg)

2. Dependencies

- An app must always declare all the dependencies and their correct versions explicitly.
- Apps might depend on external packages or libraries. Still, you should never think that these will be available on the target system.
- A Twelve Factor Application never depends on the system-wide packages’ implicit existence

3. Config

- store config in environment variables (env vars or env).
- The reason is env is easy to change between the deploys without having to change the code.
- These environment variables are never grouped in a 12 Factor App but are managed independently for each deploy.

4. Backing Services

- Backing Services means any attached services that the app consumes over the network for executing its normal operations such as MySql or S3.
- An app that complies with 12 Factor methodology makes no distinction between these services and treats all like attached resources accessed using a URL or other credentials stored in config.
- If the location or connection details of such service changes, you shouldn’t need to make changes in the code. These details should be available in the config.

![backing-services](../images/12-factor-backing-services.jpeg)

5. Build, Release, Run

- These three stages should be separated
  - Build: It converts the code repo into an executable bundle of code called build, along with fetching vendor dependencies.
  - Release: It takes the build and combines it with the current config of deploy. Therefore, this stage gives us build and config ready for execution.
  - Run: It runs the app in an execution environment.
- This separation can be done using many modern tools, making maintaining the entire system as easy as possible. More in this to come...

6. Processes

- 12 Factor processes are stateless and share nothing.
- Any data that is required time and again must be stored in a stateful backing service.
- Apps never expects that anything cached will be there in the future for new requests.

7. Port-Binding

- Apps act as a standalone service and don't require runtime injection of a webserver in an execution environment to make a web-facing service.
- Apps are self-contained and don't require any running or existing app server for the execution. The web application exports HTTP as a service by binding to a port and listens to coming in requests.

8. Concurrency

- Deploy more copies of your application instead of making your app larger.
- Support horizontal scaling of an app instead of vertical scaling.

![12-factor-concurrency](../images/12-factor-concurrency.jpeg)

9. Disposability

An applications processes are disposable, which means:

- These can start and end at a moment’s notice
- Are robust against sudden failure or app crash
- Can shut down gracefully

10. Dev/Prod Parity

Development, staging, and production of an app should be as similar as possible to ensure that anyone can understand and release it. An app that complies with 12 Factors is designed for continuous deployment by keeping the following gaps as minimum as possible:

- The Time Gap: A developer can write a code and deploy it hours or just a few minutes later.
- The Personnel Gap: Programmers or owners of the code should be closely involved in deploying it.
- The Tool Gap: The tools used for development and production should be as similar as possible.

11. Logs

- Treat log entries as event streams that are routed to a separate service for analysis and archival.
- The app logs will be written as standard outputs, but the execution environment will take care of its storage, capture, and archival.

12. Admin Processes

- Apps should run management or admin tasks in an identical environment as the app’s regular and long-running processes.

### Why would we use these rules?

Adhering to the rules of the 12 Factor app help to design and maintain robust and architecture.

It promotes tooling that lends itself towards fulfilling all cloud based requirements and reduces the risks of showing up bugs in a specific environment.

Apps can grow and shrink in response to demand, saving you infrastructure costs.

Credentials or any other confidential information should not be in code repo but in the application’s environment. This ensures security and also enforces segregation of duties.

### Resources

- [More on Service Models](https://www.quora.com/What-are-cloud-computing-types)
