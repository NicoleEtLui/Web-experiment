var canvasHeight, canvasWidth, drawingTable, isDrawing; 

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
        p.frameRate(30);
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
        console.log('isDrawing');
    }).mouseup(function () {
        isDrawing = false;
        console.log('NotDrawing');
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
    
});
