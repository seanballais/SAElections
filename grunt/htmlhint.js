module.exports = {
    build: {
        src: ['SAElections/templates/*.html'],
        options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'spec-char-espace': true,
            'id-unique': true
        }
    }
}