const gulp = require('gulp')
const csso = require('gulp-csso')
//建立gulp任务
gulp.task('first', async () => {
    console.log('第一个任务');
    gulp.src('./src/css/index.css').pipe(csso()).pipe(gulp.dest('./dist/css'))
})