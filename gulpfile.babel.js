'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';
import sass from 'gulp-sass';
import webpack from 'webpack-stream';
import pixrem from 'gulp-pixrem';
import webp from "gulp-webp";
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const critical = require('critical').stream; // Separa el CSS critico de la web y lo incrusta inline;


// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);


// Load settings from settings.yml
const {COMPATIBILITY, PORT, PATHS} = loadConfig();


function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

gulp.task('fonts', function () {
    return gulp.src([
        'src/assets/fonts/.*'])
        .pipe(gulp.dest('dist/assets/fonts/'));
});

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, sassToCss,fonts, images,favicon)));


gulp.task('webpack', function () {
    return gulp.src('./src/assets/javascript/app.js')
        .pipe(webpack({
            entry: {
                bundle: "./src/assets/javascript/app.js"
            },
            output: {

                filename: "[name].js"
            },
            mode: 'production',
            devtool: 'source-map',
            rules: [
                {
                    test: /.js/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: `jshint-loader`,
                            options: {reporter: true}
                        }
                    ]
                }
            ],

            /*
            plugins: [new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false,
                    }
                }
            })]
            */

        }))
        .pipe(gulp.dest('dist/assets/javascript/'));
});

// Build the site, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', ['webpack'], server, watch));

gulp.task('clean',
    gulp.series(clean));

gulp.task('critical', function () {
    return gulp.src('dist/**/*.html')
        .pipe(critical(
            {
                base: 'critical/',
                inline: true,
                css: ['dist/assets/css/main.css'],
                minify: true,
                ignore: ['@font-face', /url\(/]
            }
            )
        )
        .pipe(gulp.dest('critical'));
});


gulp.task('imgOpt', () =>
    gulp.src('src/assets/media/images/**/*.{jpg,png}')
        .pipe(webp({quality: 100}))
        .pipe(gulp.dest(PATHS.dist + '/assets/media/images'))
);


function clean(done) {
    rimraf('dist/', done);
}


function fonts() {
    return gulp.src(PATHS.fonts)
        .pipe(gulp.dest(PATHS.dist + '/assets/fonts'));
}

function manifest() {
    return gulp.src(PATHS.manifest)
        .pipe(gulp.dest(PATHS.dist))
}

function sw() {
    return gulp.src(PATHS.sw)
        .pipe(gulp.dest(PATHS.dist))
}


// Copy page templates into finished HTML files
function pages() {

    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
    panini.refresh();
    done();
}


// Compile Sass into CSS
// In production, the CSS is compressed
function sassToCss() {
    return gulp.src('src/assets/scss/builders/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))

        // Comment in the pipe below to run UnCSS in production
        //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
        .pipe($.if(PRODUCTION, $.cleanCss({compatibility: 'ie9'})))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.dist + '/assets/css'))
        .pipe(pixrem({rootValue: '16px', replace: true}))
        .pipe(browser.reload({stream: true}));
}


function favicon(){
    return gulp.src(PATHS.favicon)
        .pipe(gulp.dest(PATHS.dist))
}

function images() {
    return gulp.src('src/assets/media/**/*')
        .pipe($.if(PRODUCTION, $.imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(PATHS.dist + '/assets/media'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
    browser.init({
        server: PATHS.dist,
        port: PORT,
        browser: "google chrome",
        cors: true,
        notify: false,
        open: false
    });
    done();
}


// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {

    gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
    gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch('src/{data}/**/*.json').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch('src/assets/scss/**/*.scss').on('all', sassToCss);
    gulp.watch('src/assets/media/**/*').on('all', gulp.series(images, browser.reload));
    gulp.watch(['src/**/*.js']).on('all', gulp.series(['webpack'], browser.reload));


}
