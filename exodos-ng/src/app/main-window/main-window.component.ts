import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
  @ViewChild('canvas', { static: true }) public canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  squares: Square[] = new Array();

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  animate(): void {
    this.ctx.fillStyle = 'green';
    const square = new Square(this.ctx);
    this.squares.push(square);
    console.log(this.squares);
    square.move(this.squares);
  }
}

export class Square {
  private color = 'green';
  private x = 0;
  private y = 0;
  private z = 30;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveRight() {
    this.x++;
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }

  move(squares:Square[]) {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    setInterval(() => {
      this.ctx.clearRect(0, 0, width, height);
      squares.forEach((square: Square) => {
        square.moveRight();
      });
    }, 2000);    
  }
}