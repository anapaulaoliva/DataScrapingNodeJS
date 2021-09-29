/* Use the keyword 'require' to import modules and assign it to a constant or variable
https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/
 To use third-party modules such as puppeteer, they must be installed locally (e.g. 'npm i puppeteer')
 If a package.json exists, all dependencies can be installed with 'npm install'
*/
//Human-friendly and powerful HTTP request library for Node.js
const got = require('got');
//Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. 
const cheerio = require('cheerio');
const ProgressBar = require('progress');
const { link } = require('fs');
const PAGE_URLS = [];

const extractLinks = async(PAGE_URLS, pages) => {

    try {
        let url;
        for (let i = 0; i <= pages; i++) {
            url = 'https://upenn.technologypublisher.com/searchresults.aspx?q=&page=' + i + '&sort=datecreated&order=desc';

            // Fetching HTML
            const response = await got(url);
            const html = response.body;

            // Using cheerio to extract <a> tags
            const $ = cheerio.load(html);

            const linkObjects = $('a');
            // this is a mass object, not an array

            // Collect the "href" and "title" of each link and add them to an array
            linkObjects.each((index, element) => {
                PAGE_URLS.push(
                    //text: $(element).text(), // get the text
                    $(element).attr('href'), // get the href attribute
                );
            });


        }
        return (filterLinks(PAGE_URLS));

        // do something else here with these links, such as writing to a file or saving them to your database

    } catch (error) {
        console.log(error.response.body);
    }
};

const filterLinks = (linksArr) => {
    let regEx = /\/technology/
    return linksArr.filter(element => element.match(regEx));
}

/* 
Modules need to be exported so they can be imported using the 'require' keyword
1· https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
2· https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js#16631079
*/
module.exports = extractLinks;

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function() {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    } else if (bar.curr === 5) {
        bar.interrupt('Data scraping...\ncurrent progress is ' + bar.curr + '/' + bar.total);
    }
}, 1000);
