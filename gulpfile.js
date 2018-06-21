var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var babel = require("gulp-babel");

//拷贝html文件下所有的html文件到dist文件夹下
gulp.task("copy-index",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
	gulp.src("html/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})
//拷贝image文件夹下的的图片
gulp.task("copy-img",function(){
	gulp.src("image/**").pipe(gulp.dest("dist/img")).pipe(connect.reload());
})
//拷贝sass里边的所有scss文件，转换成css文件，并存到dist文件里边的css文件夹里
gulp.task("sass",function(){
	gulp.src("sass/*.scss").pipe(sass()).pipe(gulp.dest("dist/css")).pipe(connect.reload());
})
//拷贝所有的js文件
gulp.task("copy-js",function(){
	gulp.src("js/*.js").pipe(gulp.dest("dist/js")).pipe(connect.reload());
})
//实现自动刷新功能
gulp.task("server",function(){
	connect.server(
		{
			root:"dist",
			livereload:true
		}
	);
	//index.html文件和scss文件和js文件image文件实现自动更新
	gulp.watch("html/*.html",["copy-index"]);	
	gulp.watch("js/*.js",["copy-js"]);
	gulp.watch("image/**",["copy-img"]);	
	gulp.watch("sass/*.scss",["sass"]);
})
gulp.task("default",["server"]);

//压缩css文件
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());
})

//压缩图片
gulp.task("image",function(){
	gulp.src("image/**")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/img")).pipe(connect.reload());
})

//将es6转换成es5  并把拷贝到dist/js文件夹里边的文件改成es5.js
gulp.task("default",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
})