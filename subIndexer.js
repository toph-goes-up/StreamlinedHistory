//Author:Kaleb Bickmore
/*
Notes:
This Method receives the number of pages and an opened pdf file and
returns an array of the pages of the pdf, each parsed inside a pending promise
*/
module.exports = function docs(data, startPage, endPage){
  var pdfreader = require('./pdfread.js');
  return new Promise((resolve, reject) => {
    promiseArray=[];
    for(count=startPage;count<=endPage;count++){
      promiseArray.push(
        pdfreader(data,count).then(function(text){
          return{
            "page": text[1].toString(),
            "text": text[0].toString().split('.')
          }
        })
      );
    }
    resolve(promiseArray);
  });
};
