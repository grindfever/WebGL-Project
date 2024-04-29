import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.radius = radius;
        this.init(scene);
    }
    init(scene) {
        this.sphere = new MySphere(scene, this.radius, 40, 40);
    }
    display() {
        this.scene.scale(0.5, 0.5, 0.5);
        this.sphere.display();
    }
    enableNormalViz() {
        this.sphere.enableNormalViz();
    }
    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}