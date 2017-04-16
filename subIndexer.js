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
      console.log(count)
      promiseArray.push(
        pdfreader(data,count).then(function(text){

          return{
            "id": text[1].toString(),
            "text":text[0].toString()
          }
        })
      );
    }
    console.log(count)
    resolve(promiseArray)
  });
}
