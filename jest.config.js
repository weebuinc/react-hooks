/** @type {import('jest').Config} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest"],
  },
  coverageDirectory: '.coverage',
  testEnvironment: 'jsdom',
  reporters: [
    "default",
    [
      "jest-junit",
      { 
        outputDirectory: "reports",
        outputName: "jest.xml",
        ancestorSeparator: " › ",
        uniqueOutputName: "false",
        suiteNameTemplate: "{filepath}",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}"
      }
    ]
  ]
};