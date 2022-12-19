const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.superfluid.finance",
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/task",
      html: true,
      overwrite: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
