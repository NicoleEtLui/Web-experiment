var canvasHeight, canvasWidth, drawingTable; 

var p5Instance = function (p) {
    var canvas, symbol, fontRegular;
    
    
    str = "";
   
    
    function drawCanvas () {
        p.fill(255, 255, 255);
        p.stroke(255);
        p.textSize(16);
        for (var i = 0, k = 0; i < canvasWidth; i++){
            for (var j = 0; j < canvasHeight; j++) {
                //console.log(drawingTable[i][j]);
                symbol = drawingTable[i][j];
                p.text(symbol, 3 + (i * 16), 15 + (j * 16)); 
            }
        }
    };
    
    /* p.preload = function () {
        fontRegular = p.loadFont("FONT/SourceCodePro-Regular.otf");
    }*/
    p.setup = function () {
        p.frameRate(10);
        canvas = p.createCanvas(canvasHeight * 16, canvasWidth * 16);
        canvas.parent('canvasContainer');
        canvas.id('drawingCanvas');
        //p.textFont('Courier New');
    };

    p.draw = function () {
        p.background(0, 0, 0);
        drawCanvas();
        
        p.stroke(255);
        p.line(0, 16, 32, 16);
        p.line(16, 0, 16, 32);
        
    };

};

function initCanvas() {
    $('#ink').val('/');
    $('#canvasHeight').val(2);
    $('#canvasWidth').val(2); 
    canvasHeight = $('#canvasHeight').val();
    canvasWidth = $('#canvasWidth').val();
    drawingTable = [["0"," "],[" "," "]];
    
};

/*function updateCanvas() {
    ink = $('#ink').val(); 
    canvasHeight = $('#canvasHeight').val();
    canvasWidth = $('#canvasWidth').val();
};*/

$(function() {
    initCanvas();
    
    
    myp5 = new p5(p5Instance);
    
    $(document).keydown(function(event){
        $('#ink').val(event.key);
    });
    
    $('#drawingCanvas').click(function (e) {
        var offset = $(this).offset(); // permet de récupérer un objet contenant le décalage du canvas par rapport au document
        var relMouseX = e.pageX - offset.left; // translation du (0,0) du document sur le coin supérieur gauche du canvas
        var relMouseY = e.pageY - offset.top;
        
        var cellX = ~~(relMouseX/16);
        var cellY = ~~(relMouseY/16);
        drawingTable[cellX][cellY] = $('#ink').val();
        
    });
    
});
