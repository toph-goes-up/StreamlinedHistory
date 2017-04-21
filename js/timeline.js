/**
 * Created by Chris on 3/28/2017.
 */
let $ = require('jquery');
let ipc = require('electron').ipcRenderer;

let main = function(){

    let canvas = document.getElementById("timeLineCanvas");
    ctx = canvas.getContext('2d');

    let timeline = {
        width: 2000,
        height: 600,
        xoffset: 4,
        startYear: 0,
        endYear: 4000,
        bigTickHeight: 50,
        addBigTick: function (position, label = '') {
            ctx.strokeStyle = '#F4A142';
            ctx.fillStyle = '#FFFFFF';
            x = this.width * position - 2 + this.xoffset;
            y = (canvas.height * .5) - (this.bigTickHeight/2 - 1);
            ctx.strokeRect(x, y, 4, this.bigTickHeight);
            ctx.fillRect(x,y,4,this.bigTickHeight);
            if(label !== '') {
                ctx.fillStyle='#F4A142';
                ctx.font = ('36px serif');
                ctx.fillText(label, x, y);
            }
        },
        addDataPoint: function(year, description, details, link = '', position = 2){
            //Set reference point on line
            x = this.yearToX(year) * this.width - 1 + this.xoffset;
            y = (canvas.height * .5);

            //Draw vertical line dependent on position
            ctx.fillStyle = '#F4A142';
            ctx.fillRect(x, y, 2, -this.bigTickHeight * 2 * position);

            //Draw dot on the timeline
            ctx.beginPath();
            ctx.arc(x+1, y+1, 12, 0, 2*Math.PI, false);
            ctx.fill();

            //Add in data
            $('<div class="item">').insertAfter('.items').css({
                position: 'absolute',
                left: x,
                top: y - (this.bigTickHeight * position * 2) - (this.bigTickHeight * (position > 0 ? 2 : 0))
                })
                .click(function(){
                    $(this).children(".details").toggle();
                })
                .append('<h2>' + year + ': ' + description + '</h2>')
                .append('<div class="details">' + details + '</br><a href="' + link + '">Link to PDF</a>' + '</div>');
            $('.details').hide();
        },
        yearToX:function(year){
            return (year - this.startYear) / (this.endYear - this.startYear);
        },
        drawMainLine: function () {
            canvas.width = timeline.width + 100;
            canvas.height = timeline.height;
            ctx.strokeStyle = '#F4A142';
            ctx.strokeRect(this.xoffset, canvas.height * .5, timeline.width, 4);
        },
        redraw: function(timeLineData) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            this.startYear = 0; //GET MIN OF TLD
            this.endYear = 400; //GET MAX OF TLD
            this.drawMainLine();
            [0,1,2,3,4].forEach(i => {
                year = (this.endYear - this.startYear)*i/4 + this.startYear;
                pos = this.yearToX(year);
                this.addBigTick(pos, year.toString());
            });
        }
    };

    timeline.drawMainLine();
    [0,1,2,3,4].forEach(x => timeline.addBigTick(x/4, x * 1000));
    timeline.addDataPoint(86, 'Rome implodes','Rome ceases to exist as an empire, but now it\'s a pretty cool city', 'http://www.github.com', 2);
    timeline.addDataPoint(277, 'Timeline stacking','Four positions on the timeline make everything fit well','http://www.dominos.com', 1);
    timeline.addDataPoint(2222, 'Half Life 3 Released','No word on Rick and Morty season 3','http://www.dominos.com', -1);
    timeline.addDataPoint(1999, 'Hidden Details', '', '', -2)

    timeline.redraw('herp');



    $('#filter').on('change', function(){
        ipc.send('getFilteredTimelineData');
    });
};

ipc.on('timelineData', function(event, arg){
    //console.log(arg);
});

$(document).ready(main);