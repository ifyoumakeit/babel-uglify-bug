const fs = require("fs");
const babel = require("@babel/core");
const uglify = require("uglify-es");

const code = fs.readFileSync("./code.js");

// Set to support ios safari 9 and transpile fat arrows
const { code: codeBabel } = require("@babel/core").transform(code, {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: ["ios_saf >= 9"],
        },
      },
    ],
  ],
});

// Set to Uglify defaults
const { code: codeUglify } = uglify.minify(codeBabel);

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
  safari10: false,
});

const hasFatArrow = str => str.indexOf("=>") > -1;

console.log("####### START BABEL CODE #######\n\n");
console.log(codeBabel);
console.log("\n\n####### END BABEL CODE #######\n\n");

console.log("####### START UGLIFY CODE #######\n\n");
console.log(codeUglify);
console.log("\n\n####### END UGLIFY CODE #######\n\n");

console.log("####### START UGLIFY WEBPACK CODE #######\n\n");
console.log(codeUglifyWebpack);
console.log("\n\n####### END UGLIFY WEBPACK CODE #######\n\n");

console.log(
  `Does the Babel output include fat arrows?`,
  String(hasFatArrow(codeBabel))
);

console.log(
  `Does the Uglify output include fat arrows?`,
  String(hasFatArrow(codeUglify))
);

console.log(
  `Does the Uglify Webpack Plugin output include fat arrows?`,
  String(hasFatArrow(codeUglify))
);

console.log("\n\n");
