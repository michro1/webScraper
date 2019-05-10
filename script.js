// Content: NZZ web scraper    
// Authors: Valery Bamberger, Claudia List, Michelle Rosenberger
// Date:    May 10, 2019

let Parser = require('rss-parser');
let parser = new Parser();

let fs = require("fs");
 
(async () => {

  // Access url and extract information
  let feed = await parser.parseURL('https://www.nzz.ch/digital.rss');

  // Create empty array
  let article_array = [];

  // Loop for information
  feed.items.forEach(item => {

    // define objects & save information in variables
    let article_object = {title:    item.title,
                          excerpt:  item.content,
                          url:      item.link,
                          date:     item.pubDate};

    // Populate array
    article_array.push(article_object);

    
  });

  // Write output to nzz_digital.js
  fs.writeFile("nzz_digital.js", JSON.stringify(article_array, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Nzz_digitial file saved successfully!");
  });
 
})();


