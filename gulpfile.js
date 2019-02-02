const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    css = require('gulp-clean-css'),
    concat=require('gulp-concat');
    embed = require('gulp-inline-source');
    connect = require('gulp-connect');
let compressMode;
function getMode(){
	if(compressMode==undefined){
		if(process.env.npm_lifecycle_script?process.env.npm_lifecycle_script.indexOf('watch')>=0:true)
			compressMode=false;
		else
			compressMode=true;
	}
	return compressMode;
}

function showError(err){
  console.error(err.toString());
  console.error('gulp error!!!');
  this.emit('end');
}

let isServer = process.env.npm_lifecycle_script ? (process.env.npm_lifecycle_script.indexOf('server') >= 0 ? true : false) : false

gulp.task('js',function(){
    //压缩utils
    let process=gulp.src(['./src/script/utils.js','./src/script/utils/*.js'])
        .pipe(babel()).on('error',showError)
        .pipe(concat('utils.js'));
    //压缩模式启用压缩
	if(getMode())
		process=process.pipe(uglify()).on('error',showError);
    process.pipe(gulp.dest('./script'));
    //压缩常规js
	process=gulp.src(['./src/script/*.js','./src/script/pages/*.js'],{base:'./src/script'})
        .pipe(changed('./script'))
		.pipe(babel()).on('error',showError);
	//压缩模式启用压缩
	if(getMode())
		process=process.pipe(uglify()).on('error',showError);
	return process.pipe(gulp.dest('./script'));
});

gulp.task('css',function(){
	let process=gulp.src('./src/css/**/')
        .pipe(changed('./css'))
    if(getMode())
        process=process.pipe(css({rebase:false}));
	return process.pipe(gulp.dest('./css'));
});

let htmlProcess=function () {
    let process=gulp.src('./src/html/*.html')
		.pipe(embed({
            compress:false
        })).on('error',showError);
    if(getMode())
        process=process.pipe(htmlmin({
		    removeComments: true,//清除HTML注释
		    collapseWhitespace: true,//压缩HTML
		    collapseBooleanAttributes: true,//省略布尔属性的值
		    removeEmptyAttributes: true,//删除所有空格作属性值
		    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            removeAttributeQuotes:true,//删除引号
    	})).on('error',showError)
	return process.pipe(gulp.dest('./html'));
};

gulp.task('htmlAll',['js','css'],htmlProcess);

gulp.task('htmlJs',['js'],htmlProcess);

gulp.task('htmlCss',['css'],htmlProcess);

gulp.task('htmlOnly',htmlProcess);

gulp.task('watch',['htmlAll'],function(){
	gulp.watch('./src/html/**/*',['htmlOnly']);
	gulp.watch(['./src/css/**/*'],['htmlCss']);
	gulp.watch('./src/script/**/*',['htmlJs']);
})

gulp.task('clean',function(){
  return gulp.src(['./html/**/*','./css/**/*','./script/**/*'],{read:false}).pipe(clean());
})

//开启服务器
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 2333
    });
});

//开始执行
if (isServer)
    gulp.task('default', ['webserver']);
else
    gulp.task('default', ['htmlAll']);

//导出数据
const folder = './app';
gulp.task('cleanExport',function(){
    return gulp.src('./app/*').pipe(clean({force:true}));
})
gulp.task('export',['cleanExport'],function(){
    gulp.src([
        'css/*.css',
        'html/**/*.html',
        //'icon/**/*',
        'image/**/*',
        //'launch/**/*',
        'script/*.js',
        'config.xml',
        'index.html'],{base:'.'})
        .pipe(gulp.dest(folder));
})
