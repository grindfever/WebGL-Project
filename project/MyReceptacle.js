import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init(scene);
    }
    init(scene) {
        this.sphere = new MySphere(scene, 1, 40, 40);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.sphere.display();
        this.scene.popMatrix();
    }
}