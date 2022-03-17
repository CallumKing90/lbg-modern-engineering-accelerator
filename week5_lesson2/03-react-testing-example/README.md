# React Testing Example

- [React Testing Example](#react-testing-example)
  - [Overview](#overview)
  - [Setup](#setup)
    - [Adding packages](#adding-packages)
    - [Kicking off tests](#kicking-off-tests)
    - [Setting up jest](#setting-up-jest)
  - [Component testing](#component-testing)
    - [Testing functionality with Mocking](#testing-functionality-with-mocking)
  - [Snapshot testing](#snapshot-testing)
    - [Deliberate snapshot changes](#deliberate-snapshot-changes)
  - [Advanced: testing components which make API calls](#advanced-testing-components-which-make-api-calls)
  - [Further reading](#further-reading)

## Overview

Running tests for React app breaks down into:

- testing [components](#component-testing) individually (see [`Navbar.test.js`][navbar test])
- testing [snapshots](#snapshot-testing) (see [`App.test.js`][app test])
- testing with [mocked API calls](#advanced-testing-components-which-make-api-calls) (see [`StarWars.test.js`][starwars test])

## Setup

All of the setup is ready in these examples, but read this section for a breakdown of the necessary setup steps,
and take a look through the files mentioned.

### Adding packages

We need a lot of third-party packages to test our React app.

This is an example of the yarn add we did before building the tests here:

```sh
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react @testing-library/react @testing-library/jest-dom react-test-renderer msw regenerator-runtime
```

The `--dev` flag means it's only a dependency during development — these modules aren't needed in the production-ready build.

### Kicking off tests

We always like to kick off tests with `yarn test`.
This runs the command in our configured scripts, e.g. if our `package.json` has

```json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "webpack --mode=production --env NODE_ENV=production",
    "start": "webpack-dev-server --mode=development --env NODE_ENV=local"
  },
```

then when we run `yarn test`, we'll be kicking off the `jest` test runner.

### Setting up jest

We create a file at `src/setupTests.js` which runs code that we need all of our test files to execute.
For our example here, there's only two dependencies that it loads into our tests:

```js
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
// necessary for using async tests
import 'regenerator-runtime/runtime';
```

For a complex React project, we'll also need jest to be able to handle

- JSX syntax
- SCSS files

and so we added `babel-jest` with yarn
so that jest can use babel to make similar transformations
that our webpack React compiler does.

We'll also need to add `jest.config.js` to configure extra settings:

- stylesheet file handling
- our `setupTests.js`
- using a DOM-based environment

```js
module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom',
};
```

## Component testing

Take this example from [`__tests__/Navbar.test.js`][navbar test].

```jsx
describe(Navbar, () => {
  it('test', () => {
    const component = render(<Navbar />);
    // Shows the built component in our terminal — check it out!
    component.debug();
  });
});
```

We're just testing that we can **render** the component here.
If we can't, the test will error and therefore fail.

As an added bonus, the `.debug()` call allows us to view the built component as HTML in our terminal.
It produces this:

```html
<body>
  <div>
    <nav>
      <ul>
        <li>
          <button>Home</button>
        </li>
        <li>
          <button>About</button>
        </li>
        <li>
          <button>Contact</button>
        </li>
      </ul>
    </nav>
  </div>
</body>
```

### Testing functionality with Mocking

A common feature of writing automated tests is _mocking_.

_Mocking_ allows for testing components, functions, or classes in an isolated way (also known as _unit testing_)
by creating fake versions of their dependencies.
We can then check that those fake dependencies were used in the right way.

Let's take a look at an example:

```js
it('clicking Home button calls onNavChange with "Home"', () => {
  // SETUP
  // In the setup area of a test, we define anything we need to run the test.
  // A method like this is called a "mock"
  // It can have minor side-effects that we can test
  const mockHandleChange = jest.fn();
  const component = render(<Navbar onNavChange={mockHandleChange} />);

  // EXECUTION
  // We make the calls we need — in this case, getting a button and clicking it
  const homeButton = component.getByText('Home');
  // easy enough to fire a simple click
  fireEvent.click(homeButton);

  // test that Navbar called its onNavChange properly
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
  expect(mockHandleChange).toHaveBeenCalledWith('Home');
});
```

Here, we're creating a Navbar, but its `onNavChange` dependency has been _mocked_.
We essentially give it a fake purely for the purpose of checking that it
calls the fake as we would expect it to call the real version.

## Snapshot testing

Another type of testing common to frontend frameworks like React is called _snapshot testing_.

The idea is to create a _snapshot_ of a component, and in later running of tests,
we check against those snapshots to determine whether anything has changed.

When we've accidentally modified the way something is rendered,
this helps us to catch that before breaking the website for all our users inadvertently.

A snapshot test could look as simple as this example from [`App.test.js`][app test]:

```jsx
it('matches snapshot on initial render', () => {
  const app = render(<App />);
  // We'll check that the app matches the snapshot
  expect(app.baseElement).toMatchSnapshot();
});
```

Or we can extend this to test the snapshot at the end of an interaction!

```jsx
it('matches snapshot after clicking About', () => {
  const app = render(<App />);

  // Let's change something by interacting with the page
  const aboutButton = screen.getByText('About');
  fireEvent.click(aboutButton);

  // Checking the rerender matches the snapshot
  expect(app.baseElement).toMatchSnapshot();
});
```

### Deliberate snapshot changes

When we deliberately change the way a component renders, we just update the snapshots!

```sh
yarn jest --updateSnapshot
```

## Advanced: testing components which make API calls

This is where things get complicated.

We **do not**, **ever**, want our React component tests to call an API.
Doing so could make them slow, or, worse, unreliable: they may fail because
the API is unavailable or it has changed.
We should cover such eventualities with tests in Postman or other means —
and we should allow our React components' test suite to be run _independently_ of any network dependency.

The [react testing library documentation](https://testing-library.com/docs/react-testing-library/example-intro#full-example)
has a great example of this, and so do we!

Take a look at [StarWars.test.js][starwars test],
it uses a library called _Mock Service Worker_ (`msw`) to mock an HTTP call.
We can get it to return test data, and we can run snapshot tests or other tests based on this.

## Further reading

A good place to get started is [Jest's react tutorial](https://jestjs.io/docs/25.x/tutorial-react).

[navbar test]: ./src/__tests__/Navbar.test.js
[app test]: ./src/__tests__/App.test.js
[starwars test]: ./src/__tests__/StarWars.test.js
