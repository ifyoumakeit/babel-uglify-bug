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
        }
      }
    ]
  ]
});

// Set to Uglify defaults
const { code: codeUglify } = uglify.minify(codeBabel);

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

const hasNoFatArrows = str =>
  str.indexOf("=>") === -1 ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✖\x1b[0m";

console.log("####### START CODE #######");
console.log(code);
console.log("####### END CODE #######\n\n");

if (process.argv[2] === "--debug") {
  console.log("####### START BABEL CODE #######");
  console.log(codeBabel);
  console.log("\n\n####### END BABEL CODE #######\n\n");

  console.log("####### START UGLIFY CODE #######");
  console.log(codeUglify);
  console.log("\n\n####### END UGLIFY CODE #######\n\n");

  console.log("####### START UGLIFY DEFAULTS CODE #######");
  console.log(codeUglifyDefaults);
  console.log("\n\n####### END UGLIFY DEFAULTS CODE #######\n\n");

  console.log("####### START UGLIFY WEBPACK CODE #######");
  console.log(codeUglifyWebpack);
  console.log("\n\n####### END UGLIFY WEBPACK CODE #######\n\n");
}

console.log("Are fat arrows stripped?");
console.log("########################");

console.log(hasNoFatArrows(codeBabel), "Babel");
console.log(hasNoFatArrows(codeUglify), "Uglify");
console.log(hasNoFatArrows(codeUglifyDefaults), "Babel => Uglify w/ Defaults");
console.log(
  hasNoFatArrows(codeUglify),
  "Babel => Uglify w/ Webpack Plugin Defaults"
);
