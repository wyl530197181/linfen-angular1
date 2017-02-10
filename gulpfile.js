/**
 * Created by bobo on 17-2-8.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
// 合并controllers
gulp.task('concat-controllers', function () {
    gulp.src(['js/controllers/base.js', 'js/controllers/*.js'])
        .pipe(concat('my-controllers.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js'));
});
// 合并services
gulp.task('concat-services', function () {
    gulp.src(['js/services/base.js', 'js/services/*.js'])
        .pipe(concat('my-services.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js'));
});
//监听变动
gulp.task('watch', ['concat-controllers', 'concat-services'], function () {
    console.log("成功");
    var watcher = gulp.watch(['js/controllers/*.js', 'js/services/*.js'], ['concat-controllers', 'concat-services']);
    watcher.on('change', function (event) {
        console.log('success');
    });
});

