const path = require('path');
const glob = require('glob');
const config = require('../src/config');

const cwd = path.resolve(process.cwd(), config.PUBLIC_DIR);
const files = glob.sync(config.FILES, {
  cwd,
});
files.forEach((file) => {
  // const filePath = path.join(cwd, file);
  const url = `http://localhost:${config.PORT}/public/${file}`;
  console.log(url);
});

