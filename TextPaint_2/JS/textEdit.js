let gridW = 4;
let gridH = 4;
let cells = [];
let defaultChar = '#';
let ink = "/";

function setup() {
    createCanvas(gridW * 16, gridH * 16);
    background(255);

    textSize(16);

    for (let i = 0; i < gridW; i++) {
        for(let j = 0; j < gridH; j++) {

            cell = new Cell(i * 16, j * 16);
            cells.push(cell);
            cell.show();
    
        }
    }

    createButton('save')
    .mousePressed(() => {
  
      var writer = createWriter("textPaint.txt");
      let line = ''; 
      let row = 0;

      for (let i = 0; i < gridH; i++) {
          line = '';
          row = i*4;
          console.log(row);
        for (let j = 0; j < gridH; j++) {
            line += cells[row+j].content; 
        }
        writer.print(line);
      }
      writer.close();
      writer.flush();
    });

};

function draw() {

}; 

function mousePressed() {
    for (let cell of cells) {
        cell.clicked();
        cell.show();
    }
};


class Cell {
    constructor(x, y, w=16, h=16, content = defaultChar) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.content = content;
    }

    show() {
        fill(252, 10, 123); 
        stroke(255);
        rect(this.x, this.y, this.w, this.h);
        noStroke();
        fill(0);
        text(this.content, this.x + 4, this.y, this.w, this.h);
    }

    clicked() {
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.content = ink;
        }
    }
}