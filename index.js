'use strict';

var through = require('through2');
var gutil = require('gulp-util');

// Consts
var PLUGIN_NAME = 'gulp-css-str2base64';

var REGEX_FUNCTION = /str2base64\((?:'|\\'|"|\\")(.+?)(?:'|\\'|"|\\")\)/gi;

// Plugin level function(dealing with files)
function gulpCssStr2base64(opts) {
  opts = opts ||  {};
  
  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }
    
    if (file.isBuffer()) {
      var str = file.contents.toString();
      var result = str.replace(REGEX_FUNCTION, function(matches, str) {
        if (str) {
          return new Buffer(str).toString('base64'); // Success convert to base64
        }
      
        if (opts.debug) gutil.log(PLUGIN_NAME + ':', gutil.colors.red('Empty string for convert => skip'));
        return "str2base64('" + str + "')";  // Fail converting string
      });
      
      if (result) file.contents = new Buffer(result);
    }
    
    if (file.isStream()) {
      return this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    this.push(file);
    cb();
  });
};

// Exporting the plugin main function
module.exports = gulpCssStr2base64;
