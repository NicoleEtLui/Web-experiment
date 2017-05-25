var canvasHeight, canvasWidth, drawingTable; 

var p5Instance = function (p) {
    var canvas, str;
    
    str = "";
    p.setup = function () {
        canvas = p.createCanvas(canvasHeight * 16, canvasWidth * 16);
        canvas.parent('canvasContainer');
        canvas.id('drawingCanvas');
        
    };

    p.draw = function () {
        p.background(0, 0, 0);
        p.fill(255, 255, 255);
        
        p.noStroke();
        p.textSize(22);
        str = '+';
        p.text(str, 2, 16);
        p.text(str, 18, 16);
        p.text(str, 2, 32);
        p.text(str, 18, 32);
        p.stroke(255);
        p.line(0, 16, 32, 16);
        p.line(16, 0, 16, 32);
        
    };

};

$(function() {
    drawingTable = [""];
    canvasHeight = 2;
    canvasWidth = 2;
    
    for (var i = 0; i < canvasWidth * canvasHeight; i++) {
        drawingTable[i] = "+";
    };
    
    myp5 = new p5(p5Instance);
    
    $(document).keydown(function(event){
        $('#ink').val(event.key);
    });
});
