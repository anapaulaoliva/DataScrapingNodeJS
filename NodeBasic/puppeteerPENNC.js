//dynamic pages
const puppeteer = require('puppeteer');

(async () => {
    const TEST_URLS = [
        'https://upenn.technologypublisher.com/technology/44262',
        'https://upenn.technologypublisher.com/technology/44237',
        'https://upenn.technologypublisher.com/technology/44818', 
        'https://upenn.technologypublisher.com/technology/44814',
        'https://upenn.technologypublisher.com/technology/44234', 
        'https://upenn.technologypublisher.com/technology/44057',
        'https://upenn.technologypublisher.com/technology/43801' 
    ];
    let scraping_data = [];
    for(let i=0; i<=6; i++){
        let URL = TEST_URLS[i];

        //initialize browser & puppeteer library
        //headless to open the browser
        const browser = await puppeteer.launch({headless:false, /*slowMo: 250,*/ defaultViewport: null/*, devtools:true*/});
        //redirect steps here
        const page = await browser.newPage();
        //making sure everything has loaded before scraping - telling the browser the navigation loading is finished
        await page.goto(URL, { waitUntil: 'networkidle0' });

        
        //page.waitForNavigation  
        //await page.waitForSelector(() => document.querySelector('#main-content'));
        //await page.waitForXPath('//*[@id="formTechPub1"]/div');
        //like opening devtools console

	//  ------------- Article data
        let data = await page.evaluate(() => {
        //declaring elements variables

	//  ------------- Add Title
        let title = document.querySelector("#formTechPub1 > div > table > tbody > tr > td:nth-child(1) > h1").innerHTML;
    //  ------------- Add URL
        let url = document.querySelector("#formTechPub1 > div > table > tbody > tr > td:nth-child(1) > div.c_tp_direct_link > a").innerText    //  ------------- Add Title

        return {
            'title': title,
            //'articleURL': URL
        }
        });
        scraping_data.push(data);
        await browser.close();

    }
     // print data object
    console.log(scraping_data);
    //set a simple debugger to inspect data
    debugger;

    //close browser
    //await browser.close();
})();


//$ npm i progress
var ProgressBar = require('progress');
const { add } = require('cheerio/lib/api/traversing');

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function () {
bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    } else if (bar.curr === 5) {
        bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
    }
}, 1000);
