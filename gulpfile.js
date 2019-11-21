var gulp = require("gulp");
var concat = require("gulp-concat");
var webpack = require("webpack");
var plumber = require("gulp-plumber");
var less = require("gulp-less");
var gulpWebpack = require('gulp-webpack')
var minifyCss = require("gulp-csso");
var webpackdev = require("./webpack.config.js");
var webpackpro = require("./webpack.pro.js");

gulp.task("lesscomp",function(){
    return gulp.src("./app/style/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(concat("style.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest("./www/dist"))
});

gulp.task("wpdev",function(){
    gulpWebpack(webpackdev,webpack)
    .pipe(gulp.dest("./www/dist"))
})

gulp.task("wppro",function(){
    gulpWebpack(webpackpro,webpack)
    .pipe(gulp.dest("./www/dist"))
})


gulp.task('watch',function(){
    gulp.watch("./app/**/*.js",["wpdev"]);
    gulp.watch("./app/style/*.less",["lesscomp"]);
})

gulp.task("dev",["wpdev","lesscomp","watch"]);
gulp.task("pro",["wppro","lesscomp"]);
