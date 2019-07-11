var gulp   = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var src = "tim.js";

function js() {
  return gulp
    .src(src)
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./"));
}

exports.js = js;
exports.default = js;
