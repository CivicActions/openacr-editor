import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  videosFolder: "cypress/results",
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/junit.[hash].xml",
    toConsole: false,
  },
  screenshotsFolder: "cypress/results/screenshots",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:10001",
  },
});
