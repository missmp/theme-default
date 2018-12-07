"use strict";

var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
// var cssmin = require("gulp-cssmin");
var salad = require("postcss-salad")(require("./salad.config.json"));

gulp.task("compile", function() {
  return (
    gulp
      .src("./src/index.css")
      .pipe(postcss([salad]))
      // .pipe(cssmin())
      .pipe(gulp.dest("../element"))
  );
});

gulp.task("callback", function() {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch("./src/*.css", { verbose: true }, function() {
    gulp
      .src("./src/*.css")
      .pipe(postcss([salad]))
      // .pipe(cssmin())
      .pipe(gulp.dest("../element"));
  });
});

gulp.task("copyfont", function() {
  return (
    gulp
      .src("./src/fonts/**")
      // .pipe(cssmin())
      .pipe(gulp.dest("../element/fonts"))
  );
});

gulp.task("build", ["compile", "copyfont"]);
