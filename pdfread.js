/**
 * Created by Chris on 4/11/2017.
 */



 module.exports = function getPageText(file, page){
     var pdfjs = require('pdfjs-dist');
     var fs = require('fs');

     return new Promise((resolve, reject) => {
         pdfjs.getDocument(file).then(function (pdf) {
             pdf.getPage(page).then(function (pages) {
                 pages.getTextContent().then(text => {
                     var ret = '';
                     text.items.forEach(item => {
                         ret += item.str += '\n'
                     });
                     var arr=[]
                     arr=[ret,page]
                     resolve(arr);
                 });
             });
         });
     });
 };

/* Usage example:
var getPageText = require('pdfread');

var file = fs.readFileSync('ClimateScience.pdf');
getPageText(file, 1).then(function(text){
    console.log(text);
});
*/
