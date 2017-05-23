function drawHTMLtableCanvas(width, height){
    var HTMLtableCanvas = "";
    for (var j = 0; j < height; j++) {
        HTMLtableCanvas += "<tr id=row" + j + ">";
        for (var k = 0; k < width; k++) {
            var num = j + k;
            HTMLtableCanvas += "<td id=cell" + j + k + "></td>"
        }
        HTMLtableCanvas += "</tr>";
    }
    //console.log(HTMLtableCanvas);
    return HTMLtableCanvas;
};

function insertCanvasIntoHTML(width, height){
    for (var j = 0; j < height; j++) {
        for (var k = 0; k < width; k++) {
            var actualCell = 'cell' + j + k;
            //console.log(actualCell);
            myp5 = new p5(p5Instance, actualCell);
        }
    }
}

var p5Instance = function (p) {

    var canvas;
    
    p.setup = function (canvasId) {
        canvas = p.createCanvas(16, 16);
        //canvas.parent('canvasContainer');
        //canvas.id(canvasId);
    };
    
    p.draw = function () {
    
    };
    
};

//does'nt seem to work, don't know why
/*function draw(id){
};*/

$(function () {
    
    var widthCellNumber, heightCellNumber, HTMLtableCanvas, isDrawing, ink;
    
    widthCellNumber = 4;
    heightCellNumber = 4;
     
    HTMLtableCanvas = drawHTMLtableCanvas(widthCellNumber, heightCellNumber);
    
    $("#canvasTable").append(HTMLtableCanvas);
    insertCanvasIntoHTML(widthCellNumber, heightCellNumber);
    
    
    $(document).mousedown(function () {
        isDrawing = true;
        ink = $('#ink').val();
    }).mouseup(function () {
        isDrawing = false;
    }).keydown(function(event){
        $('#ink').val(event.key);
    });
        
    $("td canvas").mouseover(function () {
       if (isDrawing) {
           ctxt = this.getContext("2d");
           ctxt.font = "20px";
           ctxt.clearRect(0, 0, 16, 16);
           ctxt.fillText(ink, 5, 12);
       } 
    }).mousedown(function () {
        ctxt = this.getContext("2d");
        ctxt.font = "20px";
        ctxt.clearRect(0, 0, 16, 16);
        ctxt.fillText(ink, 5, 12);
    }).click(function () {
        ctxt = this.getContext("2d");
        ctxt.font = "20px";
        ctxt.clearRect(0, 0, 16, 16);
        ctxt.fillText(ink, 5, 12);
    });

});
