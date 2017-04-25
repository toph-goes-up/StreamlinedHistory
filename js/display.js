let $ = require('jquery');
ipcRender = require('electron').ipcRenderer;
ipcRender.on('timelineData', function(event, arg){
  console.log("In the ipcRender")
  $('#table tr').not(':first').not(':last').remove();
var html = '';
for(var i = 0; i < arg.length; i++)
            html += '<tr><td>[' + arg[i].date + ']</td><td>' + arg[i].sentence+ '</td></tr>'+ "[Page: "+arg[i].page+ ']</td></tr>';
$('#table tr').first().after(html);
});
