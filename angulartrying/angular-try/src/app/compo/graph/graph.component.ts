import {Component, EventEmitter, inject, Output} from '@angular/core';
import {GeometryElement} from 'jsxgraph';
import * as JXG from 'jsxgraph';
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth.service";
import {ShotService} from "../../shot.service";


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  private shotService = inject(ShotService);


  // points: PointResponse[] = [];

  board!: JXG.Board

  figures: GeometryElement[] = [];
  dr_points: GeometryElement[] = [];

  r: number = -1000;

  errorMessage: string = "";
  rLabel = 0.3;

  // @Output() addEvent = new EventEmitter<PointResponse>();

  // constructor(private service: PointService) {
  // }

  ngOnInit() {
    this.r = -1000
    // this.service.getPoints().subscribe(data => {
    //   this.points = data;
    // })
    this.board = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-6, 6, 6, -6],
      grid: true,
      showCopyright: false,
      axis: true,
      defaultAxes: {
        x: {
          ticks: {
            drawZero: true,
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          name: 'X',
          withLabel: true,
          color: 'black',
          label: {
            position: 'rt',
            offset: [7, 10],
            anchorX: 'right',
            color: 'black'
          }
        },
        y: {
          ticks: {
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          color: 'black',
          withLabel: true,
          name: 'Y',
          label: {
            position: 'rt',
            offset: [-15, 10],
            anchorY: 'top',
            color: "black",

          }
        }
      },
      description: 'super-puper graph',


    });
    this.refresh(5);
  }


  onClick(e: MouseEvent) {
    // @ts-ignore
    if (e.button === 2 || e.target.className === 'JXG_navigation_button') {
      return;
    }

    if (this.r != -1000) {
      let coords = this.board.getUsrCoordsOfMouse(event);
      let x = coords[0].toFixed(2);
      let y = coords[1].toFixed(2);
      let r = this.r
      console.log(x + " " + y + " " + r);


      this.shotService.addShot(Number(x), Number(y), Number(r));
      // let point = new PointRequestDto(+x, +y, r);
      // this.savePoint(point)
    } else {
      this.errorMessage = "You have to choose R"
    }
  }

  // addPoint(point: PointResponse) {
  //   this.points.push(point);
  //   this.refresh(point.r);
  // }

  // savePoint(point: PointRequestDto) {
  //   this.service.savePoint(point).subscribe(
  //       data => {
  //         console.log("New point " + data.currentTime);
  //         this.addEvent.emit(data);
  //         this.addPoint(data);
  //       },
  //
  //       error => {
  //         console.log(error);
  //       }
  //   );
  // }

  refresh(r: number) {
    this.r = r;
    this.errorMessage = ''
    console.log("Graph: " + r);
    this.clearBoard();
    this.drawFigures(r);
    this.createLabelsR(r);
    // this.drawPoints(r);
  }

  // drawPoints(r: number) {
  //   for (const point of this.points) {
  //     if (point.r == r) {
  //       this.dr_points.push(<GeometryElement>this.createPoint(point));
  //     }
  //
  //   }
  // }

  drawFigures(r: number) {
    this.figures.push(this.createRectangle(r));
    this.figures.push(this.createTriangle(r));
    this.figures.push(this.createCircle(r));
  }

  // createPoint(point: PointResponse) {
  //   let color = (point.hit ? "#7ce57c" : "#dc4a4a");
  //   return this.board.create("point", [point.x, point.y], {
  //     name: '', fixed: true, fillColor: color, fillOpacity: 1,
  //     strokewidth: 0
  //   });
  //
  // }
  createLabelsR(r: number) {
    if (r > 0.5) {

      this.board.create('text', [this.r - 0.1, 0 + this.rLabel, 'R'], {fixed: true, color: '#000000', fontSize: 11});
      this.board.create('text', [0 + 0.1, this.r, 'R'], {fixed: true, color: '#000000', fontSize: 11});

      this.board.create('text', [-this.r - 0.1, 0 + this.rLabel, '-R'], {fixed: true, color: '#000000', fontSize: 11});
      this.board.create('text', [0 + 0.1, -this.r, '-R'], {fixed: true, color: '#000000', fontSize: 11});

      if (r >= 1.5) {
        this.board.create('text', [this.r / 2 - 0.25, 0 + this.rLabel, 'R/2'], {
          fixed: true,
          color: '#000000',
          fontSize: 11
        });
        this.board.create('text', [0 + 0.1, this.r / 2, 'R/2'], {fixed: true, color: '#000000', fontSize: 11});

        this.board.create('text', [-this.r / 2 - 0.3, 0 + this.rLabel, '-R/2'], {
          fixed: true,
          color: '#000000',
          fontSize: 11
        });
        this.board.create('text', [0 + 0.1, -this.r / 2, '-R/2'], {fixed: true, color: '#000000', fontSize: 11});
      }
    }

  }

  createRectangle(r: number) {

    let rectanglePoint1 = this.board.create('point', [0, 0], {name: '', fixed: true, visible: false});
    let rectanglePoint2 = this.board.create('point', [-r / 2, 0], {name: '', fixed: true, visible: false});
    let rectanglePoint3 = this.board.create('point', [-r / 2, r], {name: '', fixed: true, visible: false});
    let rectanglePoint4 = this.board.create('point', [0, r], {name: '', fixed: true, visible: false});
    return this.board.create('polygon', [rectanglePoint1, rectanglePoint2, rectanglePoint3, rectanglePoint4],
      {fillColor: 'fuchsia', fillOpacity: 1});
  }

  createTriangle(r: number) {

    let trianglePoint1 = this.board.create('point', [0, 0], {name: '', fixed: true, visible: false});
    let trianglePoint2 = this.board.create('point', [-r / 2, 0], {name: '', fixed: true, visible: false});
    let trianglePoint3 = this.board.create('point', [0, -r], {name: '', fixed: true, visible: false});
    return this.board.create('polygon', [trianglePoint1, trianglePoint2, trianglePoint3], {
      fillColor: 'fuchsia',
      fillOpacity: 1
    });
  }

  createCircle(r: number) {

    let circlePoint1 = this.board.create('point', [r / 2, 0], {name: '', fixed: true, visible: false});
    let circlePoint2 = this.board.create('point', [0, r / 2], {name: '', fixed: true, visible: false});
    let centerPoint = this.board.create('point', [0, 0], {name: '', fixed: true, visible: false});

    return this.board.create('sector', [centerPoint, circlePoint1, circlePoint2],
      {fillColor: 'fuchsia', fillOpacity: 1});
  }

  clearBoard() {
    for (const object of this.figures) {
      this.board.removeObject(object);
    }

    for (const point of this.dr_points) {
      this.board.removeObject(point);
    }
  }


}
