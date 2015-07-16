module.exports = {
    build: {
        options: {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        },
        files: [
            {
                expand: true,
                cwd: 'SAElection/static/components/img/',
                src: ['**/*.{png, jpg, gif}'],
                dest: 'SAElections/static/img/',
            }
        ]
    }
}