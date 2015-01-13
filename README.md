# gulp-css-str2base64
> Gulp plugin. Adds a function str2base64, which convert a normal string to base64 string.

### Table of Contents

- [Install](#install)
- [Options](#options)
- [Example usage](#example-usage)
- [How to use with sass](#how-to-use-with-sass)

## Install

```shell
npm install --save-dev gulp-css-str2base64
```

## Options

  - `debug` (Boolean)
  
    Option log to console. In debug mode will be displayed warning failed string conversion to base64 string.
    This option is disabled by default.

    Enabling debug mode:
    ```js
        ...

        .pipe(str2base64({debug: true}))

        ...
    ```

## Example usage

This example shows how to automatically convert string to base64 string.

#### gulpfile.js

```js
var gulp = require('gulp');
var str2base64 = require('gulp-css-str2base64');

gulp.task('str2base64', function () {
  gulp.src('./static/css/*.css')
    .pipe(str2base64())
    .pipe(gulp.dest('./static/cache/'));
});
```

#### Contents of file "./static/css/main.css"
```css
/* Example of inserting image */
.ico-home {
    background: url("data:image/svg+xml;base64,str2base64('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" ><defs>...')");
}
```

#### Result contents of file "./static/cache/main.css"
```css
/* Example of inserting image */
.ico-home {
    background: url("data:image/svg+xml;base64,PD94...L3N2Zz4=");
}
```

## How to use with sass?
#### gulpfile.js

```js
var gulp = require('gulp');
var str2base64 = require('gulp-css-str2base64');

gulp.task('sass', function () {
  gulp.src('./static/sass/*.scss')
    .pipe(sass())
    .pipe(str2base64())
    .pipe(gulp.dest('./static/cache/'));
});
```
