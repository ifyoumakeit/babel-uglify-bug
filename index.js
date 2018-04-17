const fs = require("fs");
const babel = require("@babel/core");
const uglify = require("uglify-es");

const code = fs.readFileSync("./code.js", "utf-8");

// Set to support ios safari 9 and transpile fat arrows
const { code: codeBabel } = require("@babel/core").transform(code, {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: ["ios_saf >= 9"]
        },
        modules: false
      }
    ]
  ]
});

// Set to Uglify code
const { code: codeUglify } = uglify.minify(code);

// Set to Uglify defaults
const { code: codeUglifyDefaults } = uglify.minify(codeBabel);

// Set to webpack plugin defaults
// https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/master#uglifyoptions
const { code: codeUglifyWebpack } = uglify.minify(codeBabel, {
  ecma: undefined,
  warnings: false,
  parse: {},
  compress: true,
  mangle: true,
  output: {},
  toplevel: false,
  nameCache: null,
  ie8: false,
  keep_classnames: undefined,
  keep_fnames: false,
  safari10: false
});

// Uglify with CLI defaults
// Ran yarn uglify code.js and threw debugger into script to see defaults.
const { code: codeUglifyCliDefaults } = uglify.minify(codeBabel, {
  compress: false,
  mangle: false
});

const hasNoFatArrows = str =>
  str.indexOf("=>") === -1 ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✖\x1b[0m";

console.log("####### START CODE #######");
console.log(code);
console.log("####### END CODE #######\n\n");

if (process.argv[2] === "--debug") {
  console.log("####### START BABEL CODE #######");
  console.log(codeBabel);
  console.log("####### END BABEL CODE #######\n\n");

  console.log("####### START UGLIFY CODE #######");
  console.log(codeUglify);
  console.log("####### END UGLIFY CODE #######\n\n");

  console.log("####### START UGLIFY DEFAULTS CODE #######");
  console.log(codeUglifyDefaults);
  console.log("####### END UGLIFY DEFAULTS CODE #######\n\n");

  console.log("####### START UGLIFY WEBPACK CODE #######");
  console.log(codeUglifyWebpack);
  console.log("####### END UGLIFY WEBPACK CODE #######\n\n");

  console.log("####### START UGLIFY CLI DEFAULTS CODE #######");
  console.log(codeUglifyCliDefaults);
  console.log("####### END UGLIFY CLI DEFAULTS CODE #######\n\n");
}

console.log("Are fat arrows stripped?");
console.log("########################");

console.log(hasNoFatArrows(codeBabel), "Babel");
console.log(hasNoFatArrows(codeUglify), "Uglify");
console.log(hasNoFatArrows(codeUglifyDefaults), "Babel => Uglify w/ Defaults");
console.log(
  hasNoFatArrows(codeUglifyWebpack),
  "Babel => Uglify w/ Webpack Plugin Defaults"
);
console.log(
  hasNoFatArrows(codeUglifyCliDefaults),
  "Babel => Uglify w/ CLI Defaults"
);
