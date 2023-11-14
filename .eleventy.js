module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('assets')
    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'public',
        },
    passthroughFileCopy: true,
    templateFormats: ['md', 'html', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    };
};