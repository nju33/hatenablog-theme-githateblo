const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

const css = fs.readFileSync('src/index.css', 'utf-8');

postcss([
  autoprefixer({browsers: ['ie 8-11', 'last 2 version', 'Android > 4.3']}),
  mqpacker,
  cssnano
]).process(css)
  .then(result => {
    const comment = `
/*
  Responsive: yes
*/`.trim() + '\n\n';
    const contents = comment + result.css;
    fs.writeFileSync('dist/index.css', contents);
  });
