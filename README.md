# StreamlinedHistory
<div>
Our projects goal is to take in a pdf file and create a timeline out of the dates in that pdf.
</div>
<div>
currently our environment is not set up to take in a pdf, but you can manually put one into the indexer.js file.
</div>
<div>
if you look at the usage example in the index.js file:
</div>
<div>
indexPdf=require("./indexer.js")
</div>
<div>
indexPdf("somePdf.pdf").then(function(lunr){
</div>
<div>
 console.log(lunr)
 </div>
<div>
lunr.search("some text")
</div>
<div>
});
</div>
<div>
this will create an index of the pdf file inputed.
</div>
<div>
this is our main algorithm and we can use this to perform searches on text:
</div>
<div>
lunr.search("some text")
</div>
<div>
and it will return what pages you would find that text on.
</div>
<div>
lunr.search() also takes in regex comands and this will be how we will find dates in pdf files and output them 
</div>
<div>
into our other files.
</div>
<div>
to test our current indexer you will need to download our dependencies in the packages.json file and run our indexer.js file 
</div>
<div>
on our example pdf in another .js file using our example usage.
</div>
<div>
