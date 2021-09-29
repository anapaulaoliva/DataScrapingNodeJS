/* Use the keyword 'require' to import modules and assign it to a constant or variable
https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/
 To use third-party modules such as puppeteer, they must be installed locally (e.g. 'npm i pupeteer')
 If a package.json exists, all dependencies can be installed with 'npm install'
*/
const linkExtractor = require('./modules/linksExtractionWithGotCheerio');
const scraper = require('./modules/puppeteerPENNC');

let PageURLS = [];

const scrapeData = async() => {
    // Imported modules can now be used:
    testLinks = await linkExtractor(PageURLS, 10);
    await scraper(testLinks);
};

scrapeData();
