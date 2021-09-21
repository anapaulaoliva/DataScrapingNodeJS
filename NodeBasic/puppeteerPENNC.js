//dynamic pages
const puppeteer = require('puppeteer');

(async () => {
    //imdb example url
    const URL = 'https://upenn.technologypublisher.com/searchresults.aspx?q=&type=&page=1sort=datecreated&order=desc';
    //initialize browser & puppeteer library
    //headless to open the browser
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    //making sure everything has loaded before scraping - telling the browser the navigation loading is finished
    await page.goto(URL, { waitUntil: 'networkidle2' });

    //like opening devtools console

    //let data = await page.evaluate(() => {
        //declaring elements variables
      //  let title = await page.title();
        //let title = document.querySelector("#formTechPub1 > div > table:nth-child(3) > tbody > tr:nth-child(1) > td > h2 > a").innerHTML;
        // let publishedDate = document.querySelector('#formTechPub1 > div > table:nth-child(3) > tbody > tr:nth-child(1) > td > h3 > span').innerText; 
       //let articleURL = document.querySelector('#formTechPub1 > div > table:nth-child(3) > tbody > tr:nth-child(1) > td > h2 > a').href;
        //let articleURL = page.URL();
        //return {
          //  title, 
            //publishedDate,
            //articleURL
        //}
   // });

    // print data object
    //console.log(data);
    let title = await page.title();
    let url = await page.url();
    console.log(title,url);
    //set a simple debugger to inspect data
    //debugger;

    //close browser
    await browser.close();

})();


//$ npm i progress
var ProgressBar = require('progress');

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function () {
bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    } else if (bar.curr === 5) {
        bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
    }
}, 1000);