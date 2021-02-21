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

  // todo: get height and width of main-window and make canvas as large as possible.

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    let simple = this.renderer.listen(this.canvas.nativeElement, 'click', (evt) => {
      
      console.log('Clicking the button', evt);
    });

  }

  newUnit(): void {
    this.ctx.fillStyle = 'green';
    const square = new Square(this.ctx, 1, 2, 30);
    this.squares.push(square);
    console.log(this.squares);
    square.renderAllSquares(this.squares);
  }
}

export class Square {
  
  constructor(
    private ctx: CanvasRenderingContext2D,
    // private color: string,
    private xPosition: number,
    private yPosition: number,
    private edgeLength: number
    ) {}

  moveRight() {
    this.xPosition++;
    this.draw();
  }

  private draw() {
    // this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.edgeLength * this.xPosition, this.edgeLength * this.yPosition, this.edgeLength, this.edgeLength);
  }

  renderAllSquares(squares:Square[]) {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.clearRect(0, 0, width, height);
    squares.forEach((square: Square) => {
      square.draw();
      });  
  }

  // // this function lets squares jump across the canvas
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