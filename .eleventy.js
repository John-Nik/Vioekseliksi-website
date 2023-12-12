const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('cms');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('partytown')

    eleventyConfig.addFilter('postDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

    return {
        dir: {
            input: 'src',
            includes: 'includes',
            output: 'public',
            data: 'data'
        },
    passthroughFileCopy: true,
    templateFormats: ['md', 'html', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    };
};