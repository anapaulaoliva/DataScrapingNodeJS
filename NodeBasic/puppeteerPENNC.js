//high-level API to control Chrome or Chromium over the DevTools Protocol
/* Use the keyword 'require' to import modules and assign it to a constant or variable
https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/
 To use third-party modules such as puppeteer, they must be installed locally (e.g. 'npm i puppeteer')
 If a package.json exists, all dependencies can be installed with 'npm install'
*/
const puppeteer = require('puppeteer');

const scraper = async(testLinks) => {
    let scraping_data = [];
    for (let i = 0; i <= 6; i++) {
        let URL = `https://upenn.technologypublisher.com${testLinks[i]}`;
        //initialize browser & puppeteer library
        const browser = await puppeteer.launch({ headless: false });
        //redirect steps here
        const page = await browser.newPage();
        //making sure everything has loaded before scraping - telling the browser the navigation loading is finished
        await page.goto(URL, { waitUntil: 'networkidle0' });

        //  ------------- Article data
        let data = await page.evaluate(() => {
            //  ------------- Add Title
            let title = document.querySelector("#formTechPub1 > div > table > tbody > tr > td:nth-child(1) > h1").innerHTML;
            //  ------------- Add URL
            let url = document.querySelector("#formTechPub1 > div > table > tbody > tr > td:nth-child(1) > div.c_tp_direct_link > a").innerText
            //  ------------- Add Keywords

            return {
                'title': title,
                'articleURL': url
            }
        });
        scraping_data.push(data);
        await browser.close();
    }
    // print data object
    console.log(scraping_data);

    //set a simple debugger to inspect data
    //debugger;

    //close browser
    //await browser.close();
};

/* 
Modules need to be exported so they can be imported using the 'require' keyword
1· https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
2· https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js#16631079
*/
module.exports = scraper;
