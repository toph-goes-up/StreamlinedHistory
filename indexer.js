
/*
Author:Kaleb Bickmore
notes:
*/
module.exports = function indexPdf(fileLocation, startPage, endPage){
  var pdfjs = require('pdfjs-dist');
  var createIndex=require("lunr");
  var fs = require('fs');
  var sub=require("./subIndexer.js")//this will be used to create an array of Promise objects containing the documents that were parsed
  return new Promise((resolve, reject) => {
  var data = fs.readFileSync(fileLocation);
  pdfjs.getDocument(data).then(function (pdfDocument) {
    sub(data, startPage, endPage).then(function(promiseArray){
      Promise.all(promiseArray).then(pages => {//this opens the array of promises, extracting the data from them
        //reduce all pages into an object of {page: sentence:}
        //original format is [{page:, text:['']}]
          let sentences = pages.reduce(function(acc, page){
                  page.text.forEach(sentence => {
                      acc.push({page: page.page, sentence: sentence})
                  });
                  return acc
              },
              []
          );
          resolve(sentences);
        });
      });
    });
  });
};
/*
Usage example:

indexPdf=require("./indexer.js")
indexPdf("somePdf.pdf").then(function(lunr){
 console.log(lunr)
});

*/
