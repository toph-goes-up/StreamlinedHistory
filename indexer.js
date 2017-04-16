
/*
Author:Kaleb Bickmore
notes:
*/
module.exports = function indexPdf(fileLocation){
  var   pdfjs = require('pdfjs-dist');
  var createIndex=require("lunr")
  var fs = require('fs');
  var sub=require("./subIndexer.js")//this will be used to create an array of Promise objects containing the documents that were parsed

  return new Promise((resolve, reject) => {
  var data = fs.readFileSync(fileLocation);

  pdfjs.getDocument(data).then(function (pdfDocument) {
    sub(data,pdfDocument.numPages).then(function(promiseArray){
      Promise.all(promiseArray).then(documents => {//this opens the array of promises, extracting the data from them

        var index=createIndex(function () {
          this.ref('id')
          this.field('text')
          documents.forEach(function (doc) {
          this.add(doc)
          }, this)

          });
        resolve(index);
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
