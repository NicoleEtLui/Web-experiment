var canvasHeight, canvasWidth, drawingTable, isDrawing, gridIsVisible, isResizing; 

var p5Instance = function (p) {
    var canvas, symbol, fontRegular;
    
    
    symbol= " ";
   
    
    function drawCanvas () {
            //console.log("drawCanvas");
            p.fill(255, 255, 255);
            p.stroke(255);
            p.textSize(16);
            for (var i = 0, k = 0; i < canvasWidth; i++){
                for (var j = 0; j < canvasHeight; j++) {
                    //symbol = drawingTable[i][j];
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

function createDrawingTable () {
    drawingTable = [];
    for (var x = 0; x < canvasHeight; x++) {
        var line = []
        for (var y = 0; y < canvasWidth; y++) {
            line.push(" ");
            //$('#canvasContainer').append("<div></div>");
        }
        drawingTable.push(line);
    }
};

function initCanvas() {
    $('#ink').val('/');
    $('#canvasHeight').val(1);
    $('#canvasWidth').val(1); 
    canvasHeight = $('#canvasHeight').val();
    canvasWidth = $('#canvasWidth').val();
    createDrawingTable();
    isDrawing = false;
    gridIsVisible = true;
    isResizing = false;
};

function updateCanvas () {
    canvasWidth = $("#canvasWidth").val();
    canvasHeight = $("#canvasHeight").val();
    createDrawingTable();
    console.log(drawingTable);
 };
function drawSymbol(cX, cY) {
    drawingTable[cX][cY] = $('#ink').val();
}
$(function() {
    initCanvas();
    
    var myp5 = new p5(p5Instance);
    
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

    $("#canvasWidth, #canvasHeight").on("change", function(){
        console.log('coucou');
        
        canvasWidth = $("#canvasWidth").val();
        canvasHeight = $("#canvasHeight").val();
        
        //don't know why really but need to resize the css style also if i want something to happen, 
        //think it's because of p5js that create style width and height for the canvas.
        $('#drawingCanvas').attr({width:canvasWidth * 16, height:canvasHeight * 16}).css({width:canvasWidth * 16,height:canvasHeight * 16});
        
    })
});
