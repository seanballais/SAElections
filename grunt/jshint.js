module.exports = {
    dist: {
        src: [
            'SAElections/static/components/js/*.js',
            'SAElections/static/components/js/classes/*.js'
        ]
    },
    options: { force: true }, // report JSHint errors but not fail the task
}