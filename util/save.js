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
const flatten = config.FLATTEN_OUT_PATHS;
const flattenPath = p => p.replace(/[/\\]/g, '_');

const tasks = files.map(file => () => new Promise((resolve) => {
  // get full path:
  // const filePath = path.join(cwd, file);

  // copy file:
  // const url = `http://localhost:${config.PORT}/public/${file}`;
  // const outPath = path.join(outDir, file);
  // const outSubdir = path.dirname(outPath);
  // mkdirp.sync(outSubdir);
  // request(url).pipe(fs.createWriteStream(outPath));

  // create PDF file:
  const url = `http://localhost:${config.PORT}/public/${file}`;
  const extraParams = config.EXTRA_PARAMS ? `&${config.EXTRA_PARAMS}` : '';
  const pdfUrl = `http://localhost:${config.PORT}/api/render?url=${encodeURIComponent(url)}${extraParams}`;
  const outPath = `${path.join(outDir, flatten ? flattenPath(file) : file)}.pdf`;
  const outSubdir = path.dirname(outPath);
  mkdirp.sync(outSubdir);
  const pipe = request(pdfUrl).pipe(fs.createWriteStream(outPath));
  pipe.on('finish', () => resolve(file));
}));

tasks.reduce((promiseChain, currentTask) => promiseChain.then(chainResults =>
  currentTask().then(currentResult =>
    [...chainResults, currentResult]
  )
), Promise.resolve([])).then((arrayOfResults) => {
  console.log('printed', arrayOfResults);
});

