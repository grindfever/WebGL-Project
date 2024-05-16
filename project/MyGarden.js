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
        for (let i = 0; i < this.numRows; i++) {
            let row = [];
            for (let j = 0; j < this.numCols; j++) {
                row.push(new MyFlower(scene));
            }
            this.flowers.push(row);
        }
    }
    display() {
        let totalWidth = (this.numRows - 1) * 20;
        let totalDepth = (this.numCols - 1) * 20;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i * 20 - totalWidth / 2, 0, j * 20 - totalDepth / 2);
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
