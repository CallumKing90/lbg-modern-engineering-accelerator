# Test Driven Development

When it comes to building software, as we know, edgecases can offen cause bugs. Updating code and adding more features can introduce new bugs and in some cases, break older features in the code. These are just some of the reasons that when building applications, we should also write tests so we can be sure that the application is stable before it reaches production.

Let's be honest, developers don't like writing tests. It feels laborious to write an application and then to go back to the beginning and write hundreds, or in large applicatons, thousands of tests to make sure that the code we just wrote works when we can just run the app, click around and see for ourselves.

But let's think about this a little more...

If you built an app with hundreds of features and thousands of possible user journeys - do you think you would be confident enough in your code to be comfortable saying that it's bug free? What if you release your application and the thought process of the first user is different to yours so they click buttons in a different order and suddenly something is undefined so your code breaks? You fix the bug and at the same time release a new feature. Someone uses the feature and then another part of the app breaks as a result, because you only tested the new feature instead of doing a full regression test.

Tests seem laborious and time consuming to write, but in the long run they save us a lot of time, as we can just run the tests that we previusly wrote to make sure that everything is still working as expected.

## TDD

TDD stands for Test Driven Development. When working in a TDD workflow, you write your tests **_before_** you write your code.
This means that you know what the benchmark for your code is and what it has to do before you start your project. When working with TDD, you'll start off with a list of tests that all fail (because there's no code yet) and the task of the developer is to write the application in a way that makes all of the tests pass.

## Jest

Jest is a javascript testing library. It provides functions to **_assert_** if a condition is true of false. True means the test passes, false means it fails. Simples.

Using this method, we can run the functions from our application and ask Jest if the condition resulting from the function is the same as what we would expect (we have to provide the correct answer so jest can compare the two).

Lets set up a new project to learn testing.

1. Navigate to your desktop folders and create a new directory called `tdd-with-jest`
2. Now because Jest is a package, we need npm. Go ahead and run initialise npm in your in your `tdd-with-jest` folder. Jus press enter on all of the prompts and accept the default package.json that it generates.

```sh
npm init
```

3. Now that we have npm available, lets install jest.

```sh
npm install jest
```

4. To finish setting up our project, we need to create a script to tell jest when to run. Modify your scripts in the package.json to look like this:

```json
"scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
```

the whole package.json file should look something like this:

```json
{
  "name": "javascript-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.3.1"
  }
}
```

## How to write tests in jest - describe and it/test

Writing tests can be fairly straight forward.

Let's say we have a function called add:

```js
function add(num1, num2) {
  return num1 + num2;
}
```

to test our function, we want to create a file for our tests. Tests can be grouped together using the `describe` keyword, so if you have more than 1 test for a function, lets say a case for success and a case for failure, you can wrap them both in a `describe` block. It looks like this:

```js
describe('the add function', () => {
  // write your tests inside this block.
});
```

notice that `describe` takes 2 arguments:

- the first is a string that just tells us what this block of tests is actually testing. It will be output in the console to help you identify the tests when you run them.
- the second is a function which will wrap all of your actual tests.

Each test is defined using the `test` or `it` keyword. According to the [jest docs](https://jestjs.io/), `it` is an alias of `test` so they do exactly the same thing. Having the option of which keyword to use just helps to make our tests a little more readable. Let's see how we might write a test:

```js
test('it adds 1 to 3 to equal 4', () => {
  expect(add(1, 3)).toBe(4);
});
```

we could also use the `it` alias to shorten this to:

```js
it('adds 1 to 3 to equal 4', () => {
  expect(add(1, 3)).toBe(4);
});
```

Notice that we **_assert_** a test by using [expect()](https://jestjs.io/docs/expect) and provide a matcher using [toBe()](https://jestjs.io/docs/expect#tobevalue). There are many matchers for different scenarios and you can find them in the [jest docs](https://jestjs.io/)

## Let's give it a go

1. Create a file in the `tdd-with-jest` directory called `functions.test.js`. This is where our tests will live.

Lets write some tests for a function called `addTwoNumbers`. We will want the function to:

- accept two arguments (numbers)
- let the user know if one or both of the arguments passed to the function is not a `number` type
- if the two arguments passed to the function are numbers, it should return the total

Our tests could look a little like this:

```js
describe('addTwoNumbers', () => {
  it('adds two numbers together', () => {
    expect(addTwoNumbers(1, 2)).toBe(3);
    expect(addTwoNumbers(1.5, 2)).toBe(3.5);
  });

  it('returns an error message if incorrect data types are passed', () => {
    expect(addTwoNumbers(1, '1')).toBe(numbersDataTypeError);
    expect(addTwoNumbers(1, {})).toBe(numbersDataTypeError);
    expect(addTwoNumbers([], {})).toBe(numbersDataTypeError);
  });
});
```

copy the code above and paste it into your `functions.test.js` file.

Now we need to write the function.
Create the file `functions.js` and write the function called `addTwoNumbers` **_ make sure you export the function with module.exports = { addTwoNumbers } _**
You'll also need to create a variable for the `numbersDataTypeError` and add it to the exports. I suggest something like this:

```js
const numbersDataTypeError =
  'Incorrect data types passed to function. Types must be number';
```

Make sure you import these into the `functions.test.js` file!

```js
const { addTwoNumbers, numbersDataTypeError } = require('./functions');
```

Now finish writing the function so that you think it will pass the tests. When you think it will work, run the tests by running the test command in the terminal

```sh
npm run test
```

### Skipping tests

Nobody likes failing tests and when you're starting a TDD project, there's going to be a lot of them.

One way to silence these failures is to `skip` the tests. To do this, you can add an `x` infront of a `describe`, `test`, or `it`.
Skipping a describe will skip all of the tests inside the block, whereas skipping a test or it will just skip that particular test.

this would skip the entire describe block and all tests inside it:

```js
xdescribe('the add function', () => {
  // write your tests inside this block.
});
```

this would skil the second test **_ returns an error message if incorrect data types are passed _** but allow all other tests in the describe block to run

```js
describe('addTwoNumbers', () => {
  it('adds two numbers together', () => {
    expect(addTwoNumbers(1, 2)).toBe(3);
    expect(addTwoNumbers(1.5, 2)).toBe(3.5);
  });

  xit('returns an error message if incorrect data types are passed', () => {
    expect(addTwoNumbers(1, '1')).toBe(numbersDataTypeError);
    expect(addTwoNumbers(1, {})).toBe(numbersDataTypeError);
    expect(addTwoNumbers([], {})).toBe(numbersDataTypeError);
  });
});
```

### LAB TIME!

**_ Breakout rooms - teams of 3 _**

Write functions to make the rest of the tests pass. You'll need to:

1. Write the functions from scratch, making sure the function names match the names in the tests.
2. Make sure you add your functions to the module.exports at the bottom of the `functions.js` file
3. Make sure you add them to the imports at the top of the `functions.test.js` file

Copy these tests into your `functions.test.js` file and unskip them as you go
