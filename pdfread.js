/**
 * Created by Chris on 4/11/2017.
 */

var pdfjs = require('pdfjs-dist');
var fs = require('fs');

function getPageText(file, page){
    return new Promise((resolve, reject) => {
        pdfjs.getDocument(file).then(function (pdf) {
            pdf.getPage(page).then(function (page) {
                page.getTextContent().then(text => {
                    var ret = '';
                    text.items.forEach(item => {
                        ret += item.str += '\n'
                    });
                    resolve(ret);
                });
            });
        });
    });
}

/* Usage example:
var file = fs.readFileSync('ClimateScience.pdf');
getPageText(file, 1).then(function(text){
    console.log(text);
});
*/