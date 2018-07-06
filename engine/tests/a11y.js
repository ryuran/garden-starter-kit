const through = require('through2');
const log = require('fancy-log');
const color = require('ansi-colors');
const AxeBuilder = require('axe-webdriverjs');
const WebDriver = require('selenium-webdriver');
const fileUrl = require('file-url');
require('chromedriver');

const chromeCapabilities = WebDriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', { 'args': ['--headless'] });

const driver = new WebDriver.Builder()
  .withCapabilities(chromeCapabilities)
  .forBrowser('chrome')
  .build();

function isValidURL(status) {
  return status !== 404;
}

function reporter(result, threshold) {
  const violations = result.violations;
  log(color.cyan('File to test: ' + result.url));
  if (isValidURL(result.status)) {
    if (violations.length) {
      if (threshold < 0) {
        log(color.green('Found ' + violations.length + ' accessibility violations: (no threshold)'));
      } else if (violations.length > threshold) {
        log(color.red('Found ' + violations.length + ' accessibility violations:'));
      } else {
        log(color.green('Found ' + violations.length + ' accessibility violations: (under threshold of ' + threshold + ')'));
      }
      violations.forEach(function (ruleResult) {
        log(' ' + color.red(color.symbols.cross) + ' ' + ruleResult.help);

        ruleResult.nodes.forEach(function (violation, index) {
          log('   ' + (index + 1) + '. ' + JSON.stringify(violation.target));

          if (violation.any.length) {
            log('       Fix any of the following:');
            violation.any.forEach(function (check) {
              log('        \u2022 ' + check.message);
            });
          }

          const alls = violation.all.concat(violation.none);
          if (alls.length) {
            log('       Fix all of the following:');
            alls.forEach(function (check) {
              log('        \u2022 ' + check.message);
            });
          }
          log('');
        });
      });
    } else {
      log(color.green('Found no accessibility violations.'));
    }
  } else {
    log(color.red('URL not valid for analysis'));
  }
}

module.exports = function () {
  return through.obj(function(file, encoding, callback) {
    driver
      .get(fileUrl(file.path))
      .then(() => {
        return AxeBuilder(driver)
          .analyze()
          .then((results) => {
            reporter(results, 0);
            callback(null, file);
          })
          .catch((err) => {
            console.log(err);
            callback(null, file);
          });
      })
      .catch((err) => {
        console.log(err);
        callback(null, file);
      });;
  });
};
