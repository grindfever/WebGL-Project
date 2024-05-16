import { CGFobject } from '../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param stemRadius - Radius of the stem
 * @param stemCount - Number of divisions of the stem
 * @param stemHeight - Array with the height of each division of the stem
 */
export class MyStem extends CGFobject {
    constructor(scene, stemRadius, stemCount, stemHeight) {
        super(scene);
        this.stemRadius = stemRadius;
        this.stemCount = stemCount;
        this.stemHeight = stemHeight;
        this.init(scene);
    }
    init(scene) {
        this.cylinder = new MyCylinder(scene, 16, 32, this.stemRadius);
        this.leaf = new MyPetal(scene, 0);
    }
    display() {
        let totalHeight = this.stemHeight[0];

        this.scene.pushMatrix();
        this.scene.scale(1, this.stemHeight[0], 1);
        this.cylinder.display();
        this.scene.popMatrix();

        for (let i = 1; i <= this.stemCount; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, totalHeight, 0);
            this.scene.scale(1, this.stemHeight[i], 1);
            this.cylinder.display();
            this.scene.popMatrix();
            
            if (i != this.stemCount) {
                for (let j = 1; j <= 3; j++) {
                    this.scene.pushMatrix();
                    this.scene.rotate(Math.PI / 2, 1, 0, 0);
                    this.scene.translate(0, 0, -0.2 - totalHeight);           
                    this.scene.rotate(j * 2 * Math.PI / 3, 0, 0, 1);
                    this.scene.scale(4, 2, 2);
                    this.leaf.display();
                    this.scene.popMatrix();
                }
            }
            totalHeight += this.stemHeight[i];
        }
    }
    enableNormalViz() {
        this.cylinder.enableNormalViz();
    }
    disableNormalViz() {
        this.cylinder.disableNormalViz();
    }
}
