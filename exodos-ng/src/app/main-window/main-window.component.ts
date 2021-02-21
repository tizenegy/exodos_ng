import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
  @ViewChild('canvas', { static: true }) public canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  squares: Square[] = new Array();
  gridWidth: number = 20;

  // todo: get height and width of main-window and make canvas as large as possible.

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.height = 800;
    this.ctx.canvas.width = 900;
    let canvasClickListener = this.renderer.listen(this.canvas.nativeElement, 'click', (event) => {
      this.newUnit(event.offsetX, event.offsetY);
    });
    let canvasArrowListener = this.renderer.listen(document, 'keydown', (event) => {
      event.preventDefault();
      this.orderUnit(event.keyCode);
    });
  }

  newUnit(x: number, y: number): void {
    this.ctx.fillStyle = 'green';
    var xPosition = x - (x % this.gridWidth);
    var yPosition = y - (y % this.gridWidth);
    const square = new Square(this.ctx, xPosition, yPosition, this.gridWidth);
    this.squares.push(square);
    square.renderAllSquares(this.squares);
  }

  orderUnit(code: number): void{
    let recentUnit = this.squares[this.squares.length-1];
    recentUnit.move(code, this.gridWidth, this.squares);
  }
}


export class Square {
  
  constructor(
    private ctx: CanvasRenderingContext2D,
    private xPosition: number,
    private yPosition: number,
    private edgeLength: number
    ) {}

  move(code:number, gridWidth:number, squares:Square[]) {
    switch(code) { 
      case 37: { 
        this.xPosition = this.xPosition - gridWidth; 
         break; 
      } 
      case 38: { 
        this.yPosition = this.yPosition - gridWidth;  
         break; 
      } 
      case 39: { 
        this.xPosition = this.xPosition + gridWidth; 
         break; 
      } 
      case 40: { 
        this.yPosition = this.yPosition + gridWidth;
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
    this.renderAllSquares(squares);
  }

  private draw() {
    this.ctx.fillRect(this.xPosition, this.yPosition, this.edgeLength, this.edgeLength);
  }

  renderAllSquares(squares:Square[]) {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.clearRect(0, 0, width, height);
    squares.forEach((square: Square) => {
      square.draw();
      });  
  }

  // // this function lets squares jump across the canvas. it is not needed now.
  // move(squares:Square[]) {
  //   const width = this.ctx.canvas.width;
  //   const height = this.ctx.canvas.height;
  //   setInterval(() => {
  //     this.ctx.clearRect(0, 0, width, height);
  //     squares.forEach((square: Square) => {
  //       square.moveRight();
  //     });
  //   }, 2000);    
  // }
}