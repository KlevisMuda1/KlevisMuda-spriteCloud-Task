const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
    require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
    require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://www.uitestingplayground.com/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      html: false,
      overwrite: false
    },
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
