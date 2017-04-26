/**
 * Created by Chris on 4/25/2017.
 */
var Classifier = require('classifier');
var bayes = new Classifier.Bayesian();

module.exports = function(sentences){
    let kept = sentences.filter(x => {return x.sentence.match(/.*\d.*/)});
    kept = kept.filter(x => {return bayes.classifySync(x.sentence) == 'y'});
    kept.forEach(item => {
        var numbers = item.sentence.match(/\d+/g);
        numbers = numbers.map(x => parseInt(x));
        numbers = numbers.filter(num => {return num <= 2017});

        item['date'] = Math.max.apply(Math, numbers);
    });
    return kept
};

var fs = require('fs')
bayes.fromJSON(JSON.parse(fs.readFileSync('bayes.json')));
indexPdf = require("./indexer.js");
classify = require("./classify.js");
indexPdf("./pdfs/irish.pdf", 9, 217).then(sentences => {
    dates = module.exports(sentences);
});