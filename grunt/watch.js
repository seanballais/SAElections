module.exports = {
    all: {
        files: ['{ !grunt, !node_modules, SAElections/templates, SAElections/static/components/*, SAElections/static/*{!components} }/*.{ html, js, css, png, jpg }'],
        options: {
            livereload: true
        }
    },
    js: {
        files: ['SAElections/static/components/js/*.js'],
        tasks: ['jshint', 'uglify', 'notify:task_js']
    },
    html: {
        files: ['SAElections/templates/*.html'],
        tasks: ['htmlhint:build', 'notify:task_html']
    },
    css: {
        files: ['SAElections/static/components/scss/*.scss'],
        files: [
            'SAElections/static/components/scss/block-elements/*.scss',
            'SAElections/static/components/scss/include/*.scss',
            'SAElections/static/components/scss/page/*.scss'
        ],
        tasks: ['sass', 'autoprefixer:build', 'cssc:build', 'cssmin:build', 'notify:task_css']
    } 
    /** 
     * Image optimization is not included here because
     * this watch is for dev purposes only.
     */
}