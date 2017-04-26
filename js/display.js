
let $ = require('jquery');
ipcRender = require('electron').ipcRenderer;
<<<<<<< HEAD
ipcRender.send("reply","hello");
ipcRender.on('timelineData', function(event, arg){
  console.log("In the ipcRender");
  $('#table tr').not(':first').not(':last').remove();
=======
//test for display.js
//pcRender.send("reply","hello")
ipcRender.on('timelineData', function(event, arg){
  //sort the jsons before creating html
  arg.sort(function(a, b) {
      return parseInt(a.date) - parseInt(b.date);
  });

>>>>>>> 0be8ab614c2187a77198c98ee2a5c9c1795ab503
var html = '';
//create the html for display.html with json objects
for(var i = 0; i < arg.length; i++){
  html += '<tr><td style="text-align:left;">[' + arg[i].date +
    ']'+'</td><td style="text-align:center;">' +arg[i].sentence+
    '</td><td style="text-align:right;"> '+ " [Page: "+arg[i].page+ ']</td></tr>';
      }
$('#table tr').first().after(html);
});
