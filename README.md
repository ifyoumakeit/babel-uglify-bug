# Babel => Uglify bug

Seems like uglify's rules are slightly confusing for the javascript API.

* To reproduce...
* Run `yarn start` (--debug) for code outputs

Via CLI it is fine

* `yarn babel code.js` - No fat arrows
* `yarn uglifyjs code.js` - No fat arrows
