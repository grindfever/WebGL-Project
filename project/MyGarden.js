import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numRows - Number of rows of flowers
 * @param numCols - Number of columns of flowers
 */
export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.init(scene);
    }
    init(scene) {
        this.flowers = [];
        this.flowersPositions = [];
        let totalWidth = (this.numRows - 1) * 15;
        let totalDepth = (this.numCols - 1) * 15;
        for (let i = 0; i < this.numRows; i++) {
            let row = [];
            let rowPositions = [];
            for (let j = 0; j < this.numCols; j++) {
                rowPositions.push([i * 15 - totalWidth / 2, j * 15 - totalDepth / 2]);
                row.push(new MyFlower(scene));
            }
            this.flowers.push(row);
            this.flowersPositions.push(rowPositions);
        }
    }
    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(this.flowersPositions[i][j][0], 0, this.flowersPositions[i][j][1]);
                this.scene.scale(0.5, 0.5, 0.5);
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
    enableNormalViz() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.flowers[i][j].enableNormalViz();
            }
        }
    }
    disableNormalViz() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.flowers[i][j].disableNormalViz();
            }
        }
    }
}
