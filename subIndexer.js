//Author:Kaleb Bickmore
/*
Notes:
This Method receives the number of pages and an opened pdf file and
returns an array of the pages of the pdf, each parsed inside a pending promise 
*/
module.exports = function docs(data,numPages){

  var pdfreader = require('./pdfread.js');
  return new Promise((resolve, reject) => {
    promiseArray=[]
    for(count=1;count<=numPages;count++){
      promiseArray.push(
        pdfreader(data,count).then(function(text){
          return{
            "id": count.toString(),
            "text":text.toString()
          }
        })
      );
    }
    resolve(promiseArray)
  });
}
