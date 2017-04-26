let $ = require('jquery');
ipcRender = require('electron').ipcRenderer;
ipcRender.send("reply","hello")
ipcRender.on('timelineData', function(event, arg){

  $('#table tr').not(':first').not(':last').remove();
var html = '';
for(var i = 0; i < arg.length; i++){
            html += '<tr><td style="text-align:left;">[' + arg[i].date +
             ']'+'</td><td style="text-align:center;">' +arg[i].sentence+
            '</td><td style="text-align:right;"> '+ " [Page: "+arg[i].page+ ']</td></tr>';
          }
$('#table tr').first().after(html);
});
