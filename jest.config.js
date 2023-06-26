/** @type {import('jest').Config} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest"],
  },
  coverageDirectory: '.coverage',
  testEnvironment: 'jsdom'
};