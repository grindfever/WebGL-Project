import { CGFobject } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyDiamond } from './MyDiamond.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init(scene);
    }
    init(scene) {
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.diamond = new MyDiamond(scene);
    }
    display() {
        // Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.triangle.display();
        this.scene.popMatrix();

        // Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(2, 2, 2);
        this.triangle.display();
        this.scene.popMatrix();

        // Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(2, 2, 2);
        this.triangle.display();
        this.scene.popMatrix();

        // Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(1.5, 1.5, 1.5);
        this.triangle.display();
        this.scene.popMatrix();

        // Red Triangle
        this.triangle.display();

        // Green Square
        this.scene.pushMatrix();
        this.scene.translate(-0.75, 1.5, 0);
        this.diamond.display();
        this.scene.popMatrix();

        // Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate((-3 * Math.PI) / 5, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}
