// Content: NZZ web scraper    
// Authors: Valery Bamberger, Claudia List, Michelle Rosenberger
// Date:    May 10, 2019

// Packages
let fs      = require("fs");
let Parser  = require('rss-parser');
let parser  = new Parser();
const { exec } = require('child_process');

async function scrape() {

  let feed = await parser.parseURL('https://www.nzz.ch/digital.rss');

  let article_array = [];

  feed.items.forEach(function(item) {

    let article_object = {
      title:    item.title,
      excerpt:  item.content,
      url:      item.link,
      date:     item.pubDate
    };

    article_array.push(article_object);
  
  });

  article_array.sort(function(a, b) {
    if (Date.parse(a.date) > Date.parse(b.date)) {
      return -1;
    } else {
      return 1;
    }
  });

  fs.writeFile("nzz_digital.js", JSON.stringify(article_array, null, 2), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Nzz_digitial file saved successfully at: " + new Date().toLocaleTimeString() + "\n");
      exec(`code ./nzz_digital.js`);
    }
  });
};


let intervalSeconds = 60 * 60 * 24; // Default time interval 

if (process.argv.length === 3) {  // User specified time interval
  intervalSeconds = process.argv[2] 
}

console.log("Updating every: " + intervalSeconds + " seconds.");


scrape();
setInterval(scrape, 1000 * intervalSeconds);

