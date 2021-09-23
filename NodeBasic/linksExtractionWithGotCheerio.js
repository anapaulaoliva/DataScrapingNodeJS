const got = require('got');
const cheerio = require('cheerio');
const { link } = require('fs');
const PAGE_URLS = [];
let url;

const extractLinks = async (PAGE_URLS, url, pages) => {

    try {
        for(let i=0; i<=pages; i++){
            url = 'https://upenn.technologypublisher.com/searchresults.aspx?q=&page='+i+'&sort=datecreated&order=desc';
        
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
        console.log(filterLinks(PAGE_URLS));

        console.log(filterLinks(PAGE_URLS).length);
    
        // do something else here with these links, such as writing to a file or saving them to your database

    } catch (error) {
        console.log(error.response.body);
    }
};

const filterLinks = (linksArr) => {
    let regEx = /\/technology/
    return linksArr.filter(element => element.match(regEx));
}

extractLinks(PAGE_URLS, url, 5);





