module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom',
};
