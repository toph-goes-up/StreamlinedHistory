/**
 * Created by Chris on 4/20/2017.
 */
var getSentences = require('./indexer.js');
var rl = require('readline-sync');
var classifier = require('classifier');
var fs = require('fs');
var bayes = new classifier.Bayesian();
try{
    bayes.fromJSON(JSON.parse(fs.readFileSync('bayes.json')));
    console.log('Loaded Classifier: ' + JSON.stringify(bayes.getCats()));
    bayes.setThresholds({y: 4, n: 1});
}
catch(e) {
    console.log('No classifier found in ./bayes.json. Using new classifier.');
}

sentences = getSentences('./pdfs/irish.pdf', 9, 100).then(sentences => {
    let cycleFlag = true;
    while (cycleFlag){
        sentence = sentences[Math.floor(Math.random() * sentences.length)].sentence;
        if (sentence.match(/.*\d.*/)) {
            rl.setDefaultOptions({limit: ['y', 'n', 's']});
            input = rl.question(sentence + '\n ==>:');

            if (input == 'y') {
                bayes.train(sentence.replace(/\d/g, 'N'), 'y');
            }
            else if (input == 'n') {
                bayes.train(sentence.replace(/\d/g, 'N'), 'n');
            }
            else if (input == 's') {
                postTraining();
                cycleFlag = false;
            }
        }
    }
});

var postTraining = function(){
    var json = bayes.toJSON();
    console.log(bayes.getCats());
    console.log(bayes.thresholds);
    fs.writeFileSync('bayes.json', JSON.stringify(bayes.toJSON(), null, 4));
    sentence = 'Jesus died in year 30 CE';
    console.log('Classified "' + sentence + '" as: ' + bayes.classify(sentence.replace(/\d/g, 'N')));
};
