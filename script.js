// Content: NZZ web scraper    
// Authors: Valery Bamberger, Claudia List, Michelle Rosenberger
// Date:    May 10, 2019

// Packages
let fs      = require("fs");
let Parser  = require('rss-parser');
let parser  = new Parser();


// Define scrape function
async function scrape() {

  // Define .rss feed
  let feed = await parser.parseURL('https://www.nzz.ch/digital.rss');

  // Create empty array
  let article_array = [];

  // Loop for information
  feed.items.forEach(item => {

    // Define objects and save information
    let article_object = {
      title:    item.title,
      excerpt:  item.content,
      url:      item.link,
      date:     item.pubDate
    };

    // Populate array
    article_array.push(article_object);
  
  });

  // Sort array by dates
  article_array.sort((a, b) => {
    if (Date.parse(a.date) > Date.parse(b.date)) {
      return -1;
    } else {
      return 1;
    }
  })

  // Write output to nzz_digital.js
  fs.writeFile("nzz_digital.js", JSON.stringify(article_array, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Nzz_digitial file saved successfully at: " + new Date().toLocaleTimeString() + "\n");
    
  });

};


// Set default time interval
let intervalSeconds = 60 * 60 * 24;

// User specified time interval
if (process.argv.length === 3) {
  intervalSeconds = process.argv[2] 
}

console.log("Updating every: " + intervalSeconds + " seconds.");

// Call function
scrape();
setInterval(scrape, 1000 * intervalSeconds);



