var canvasHeight, canvasWidth, drawingTable, isDrawing, gridIsVisible; 

var p5Instance = function (p) {
    var canvas, symbol, fontRegular;
    
    
    str = "";
   
    
    function drawCanvas () {
        p.fill(255, 255, 255);
        p.stroke(255);
        p.textSize(16);
        for (var i = 0, k = 0; i < canvasWidth; i++){
            for (var j = 0; j < canvasHeight; j++) {
                symbol = drawingTable[i][j];
                p.text(symbol, 3 + (i * 16), 15 + (j * 16)); 
            }
        }
    };
    
    function drawGrid() {
        if (gridIsVisible){
            p.stroke(255);
            for(var x = 1; x < canvasWidth; x++){
                p.line( x * 16, 0, x * 16,canvasHeight * 16 );
            };
            for(var y = 1; y < canvasHeight; y++){
                p.line( 0, y * 16, canvasWidth * 16 , y * 16 );
            };
        };
    };
    
    p.setup = function () {
        p.frameRate(30);
        canvas = p.createCanvas(canvasHeight * 16, canvasWidth * 16);
        canvas.parent('canvasContainer');
        canvas.id('drawingCanvas');
        //p.textFont('Courier New');
    };

    p.draw = function () {
        p.background(0, 0, 0);
        drawCanvas();
        drawGrid();
    };

};

function initCanvas() {
    $('#ink').val('/');
    $('#canvasHeight').val(20);
    $('#canvasWidth').val(20); 
    canvasHeight = $('#canvasHeight').val();
    canvasWidth = $('#canvasWidth').val();
    drawingTable = [];
    for (var x = 0; x < canvasHeight; x++) {
        var line = []
        for (var y = 0; y < canvasWidth; y++) {
            line.push(" ");
            //$('#canvasContainer').append("<div></div>");
        }
        drawingTable.push(line);
    }
    isDrawing = false;
    gridIsVisible = false;
};

function drawSymbol(cX, cY) {
    drawingTable[cX][cY] = $('#ink').val();
}
$(function() {
    initCanvas();
    
    myp5 = new p5(p5Instance);
    
    $(document).keydown(function(event){
        $('#ink').val(event.key);
    }).mousedown(function () {
        isDrawing = true;
    }).mouseup(function () {
        isDrawing = false;
    });
    
    $('#drawingCanvas').click(function (e) {
        var offset = $(this).offset(); // permet de récupérer un objet contenant le décalage du canvas par rapport au document
        var relMouseX = e.pageX - offset.left; // translation du (0,0) du document sur le coin supérieur gauche du canvas
        var relMouseY = e.pageY - offset.top;
        
        var cellX = ~~(relMouseX/16);
        var cellY = ~~(relMouseY/16);

        drawSymbol(cellX, cellY);
    });
    /*$('#drawingCanvas').mousemove(function (e) {
        console.log('coucou');
            var offset = $(this).offset(); // permet de récupérer un objet contenant le décalage du canvas par rapport au document
            var relMouseX = e.pageX - offset.left; // translation du (0,0) du document sur le coin supérieur gauche du canvas
            var relMouseY = e.pageY - offset.top;
            
            var cellX = ~~(relMouseX/16);
            var cellY = ~~(relMouseY/16);

            drawSymbol(cellX, cellY);
        });*/
    
    $("#gridButton").on("click", function () {
       if (gridIsVisible) {
           gridIsVisible = false;
       } else {
           gridIsVisible = true;
       }
    });
    
});
