var gulp = require('gulp'), //基础库
    gulpif = require('gulp-if'),
    //css压缩                     
    minifycss = require('gulp-minify-css'),
    //文件重命名     
    concat = require('gulp-concat'),
    //js压缩           
    uglify = require('gulp-uglify'),
    //文件重命名           
    rename = require('gulp-rename'),
    //清空文件夹方法1           
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    cache = require('gulp-cache'), //由于压缩图片比较耗时，我们只需要压缩修改的图片，没有修改的直接从缓存中读取
    //清空文件夹方法2              
    del = require('del');


  // 设置环境变量
var env = 'build';    // 用于执行gulp任务时的判断


//压缩css，在cmd中输入gulp minifycss后，执行的就是这个命令
gulp.task('minifycss', function () {
    return gulp.src('src/golday.css') //压缩的文件
        //合并所有js到main.css
        .pipe(concat('main.css'))
        //输出main.css到文件夹 
        .pipe(gulp.dest('minified/css'))
        //rename压缩后的文件名   
        .pipe(rename({
            suffix: '.min'
        }))
        //执行压缩 
        .pipe(minifycss())
        //输出文件夹 
        .pipe(gulp.dest('minified/css'));
});


//压缩js，在cmd中输入gulp minifyjs后，执行的就是这个命令
gulp.task('minifyjs', function () {
    return gulp.src('src/main.js') //压缩的js文件
        //合并所有js到main.js
        .pipe(concat('main.js'))
        //输出main.js到文件夹 
        .pipe(gulp.dest('minified/js'))
        //rename压缩后的文件名
        .pipe(rename({
            suffix: '.min'
        }))
        //压缩 
        .pipe(uglify())
        //输出  
        .pipe(gulp.dest('minified/js'));
});


//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function () {
    del(['minified/css', 'minified/js']);
});

// 压缩html
gulp.task('html', function () {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('index/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dest/'));
});

//压缩图片
gulp.task('images', function () {
    return gulp.src('./src/images/**')
        .pipe(gulpif(env === 'build', cache(imagemin({
            optimizationLevel: 5, // 取值范围：0-7（优化等级），默认：3  
            progressive: true, // 无损压缩jpg图片，默认：false 
            interlaced: true, // 隔行扫描gif进行渲染，默认：false 
            multipass: true // 多次优化svg直到完全优化，默认：false 
        }))))
        .pipe(gulp.dest('./dist/images'));
});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['clean', 'minifycss', 'minifyjs', 'html', 'images']);