const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const glob = require('glob');
const request = require('request');
const config = require('../src/config');

const cwd = path.resolve(process.cwd(), config.PUBLIC_DIR);
const outDir = path.resolve(process.cwd(), config.OUT_DIR);
const files = glob.sync(config.FILES, {
  cwd,
});

files.forEach((file) => {
  // get full path:
  // const filePath = path.join(cwd, file);

  // copy file:
  const url = `http://localhost:${config.PORT}/public/${file}`;
  const outPath = path.join(outDir, file);
  const outSubdir = path.dirname(outPath);
  mkdirp.sync(outSubdir);
  request(url).pipe(fs.createWriteStream(outPath));
});

