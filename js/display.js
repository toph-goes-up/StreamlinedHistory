
let $ = require('jquery');
ipcRender = require('electron').ipcRenderer;

//test for display.js
//pcRender.send("reply","hello")
ipcRender.on('timelineData', function(event, arg){
  //sort the jsons before creating html
  console.log('PING!');
  arg.sort(function(a, b) {
      return parseInt(a.date) - parseInt(b.date);
  });

  var html = '';
  //create the html for display.html with json objects
  for(var i = 0; i < arg.length; i++){
    html += '<tr><td style="text-align:left;">[' + arg[i].date +
      ']'+'</td><td style="text-align:center;">' +arg[i].sentence+
      '</td><td style="text-align:right;"> '+ " [Page: "+arg[i].page+ ']</td></tr>';
        }
  $('#table tr').first().after(html);
});

let main = function(){
  ipcRender.send('displayReady');
};

$(document).ready(main);