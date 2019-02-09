const path = require('path');
const fs = require('fs-extra')

module.exports = function gskInit(config) {
  // copy files from `gsk/starter` directory
  // excluding `package.json` and main `README`
  fs.copySync(path.resolve(__dirname, '../starter'), process.cwd(), {
    filter: (src) => {
      return !/starter\/(README(.dist)?.md|package.json)$/.test(src)
    }
  });

  const json = require('../starter/package.json');

  const packagePath = path.resolve(process.cwd(), 'package.json')
  const packageJson = fs.readJsonSync(packagePath)

  // merge package.json for scripts and dependencies
  packageJson.scripts = {
    ...packageJson.scripts,
    ...json.scripts
  }
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...json.dependencies
  }
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...json.devDependencies
  }

  fs.writeJson(packagePath, packageJson)
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })


  // Fill README with package.json information
  fs.readFile(path.resolve(__dirname, '../starter/README.dist.md'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    fs.writeFile(
      path.join(process.cwd(), 'README.md'),
      data.replace('__PROJECT_NAME__', packageJson.title || packageJson.name),
      'utf8',
      (err) => {
        if (err) {
          throw err;
        }
        console.log('The file has been saved!');
      }
    );
  });

  // invite to run `npm install`
}
