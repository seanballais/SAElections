module.exports = {
    options: {
        beautify: true
    },
    dist: {
        files: {
            'SAElections/static/js/user/script.js': ['SAElections/static/components/**/*.js'] // compress and combine files
        }
    }
}