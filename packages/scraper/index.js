const Scraper = require('./Scraper');

// create instance of class and set site to scrape
const scrape = new Scraper('https://www.playstation.com/es-es/ps-plus/games/');
// get title tag from html
const title = await scrape.getText('title');
// get meta tag 'keywords' from html
const metaKeywords = await scrape.getAttribute('meta[name="keywords"]');
// print results
console.log(title);
console.log(metaKeywords);