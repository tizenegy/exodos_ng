import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
  @ViewChild('canvas', { static: true }) public canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  units: Unit[] = new Array();
  gridWidth: number = 20;

  // todo: get height and width of main-window and make canvas as large as possible.

  constructor(private renderer: Renderer2, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.height = 800;
    this.ctx.canvas.width = 900;
    let canvasClickListener = this.renderer.listen(this.canvas.nativeElement, 'click', (event) => {
      this.activateUnit(event.offsetX, event.offsetY);
    });
    let canvasArrowListener = this.renderer.listen(document, 'keydown', (event) => {
      event.preventDefault();
      this.orderUnit(event.keyCode);
    });
    this.units.push(new Unit(20, 20, this.gridWidth, false));
    this.units.push(new Unit(40, 40, this.gridWidth, false));
    this.units.push(new Unit(100, 40, this.gridWidth, false));
    this.units.push(new Unit(40, 100, this.gridWidth, false));
    this.units.push(new Unit(120, 120, this.gridWidth, false));
    this.renderAllUnits();
  }

  activateUnit(x: number, y: number): void {
    var xPosition = x - (x % this.gridWidth);
    var yPosition = y - (y % this.gridWidth);
    let result = this.units.find(unit => unit.getxPosition() === xPosition && unit.getyPosition() === yPosition);
    console.log(result);
  }

  newUnit(x: number, y: number): void {
    var xPosition = x - (x % this.gridWidth);
    var yPosition = y - (y % this.gridWidth);
    const unit = new Unit(xPosition, yPosition, this.gridWidth, false);
    this.units.push(unit);
    // todo: start using localstorage correctly
    this.localStorageService.setItem('allUnits', JSON.stringify(this.units));
    this.renderAllUnits();
    
  }

  orderUnit(code: number): void{
    let recentUnit = this.units[this.units.length-1];
    recentUnit.move(this.ctx, code, this.gridWidth, this.units);
  }

  renderAllUnits() {
    this.ctx.fillStyle = 'green';
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.clearRect(0, 0, width, height);
    this.units.forEach((unit: Unit) => {
      unit.draw(this.ctx);
      });
  }

}


export class Unit {
  
  constructor(
    private xPosition: number,
    private yPosition: number,
    private edgeLength: number,
    private isActive: boolean
    ) {}

  getxPosition(): number {
    return this.xPosition;
  }
  getyPosition(): number {
    return this.yPosition;
  }

  move(ctx: CanvasRenderingContext2D, code:number, gridWidth:number, units:Unit[]) {
    switch(code) { 
      case 37: { 
        this.clear(ctx);
        this.xPosition = this.xPosition - gridWidth; 
         break; 
      } 
      case 38: { 
        this.clear(ctx);
        this.yPosition = this.yPosition - gridWidth;  
         break; 
      } 
      case 39: { 
        this.clear(ctx);
        this.xPosition = this.xPosition + gridWidth; 
         break; 
      } 
      case 40: { 
        this.clear(ctx);
        this.yPosition = this.yPosition + gridWidth;
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.xPosition, this.yPosition, this.edgeLength, this.edgeLength);
  }

  clear(ctx: CanvasRenderingContext2D){
    ctx.clearRect(this.xPosition, this.yPosition, this.edgeLength, this.edgeLength);
  }

  // // this function lets units jump across the canvas. it is not needed now.
  // move(units:Unit[]) {
  //   const width = this.ctx.canvas.width;
  //   const height = this.ctx.canvas.height;
  //   setInterval(() => {
  //     this.ctx.clearRect(0, 0, width, height);
  //     units.forEach((unit: Unit) => {
  //       unit.moveRight();
  //     });
  //   }, 2000);    
  // }
}