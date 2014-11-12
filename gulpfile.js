var gulp = require('gulp');
var configFile = "./config.json";
var config;


gulp.task('loadConfig', function() {
        try {
            config = require(configFile);
        } catch (err) {
            console.error("Config file not found. Create one by copying config.example.json to config.json and modifying the properties accordingly");
            throw err;
        }
});


gulp.task('default', ['loadConfig'], function(){
    console.log(config.buildDir);
});
