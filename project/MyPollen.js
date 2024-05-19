import { MySphere } from './MySphere.js';
/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Sphere radius
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPollen extends MySphere {
    constructor(scene, radius, slices, stacks) {
        super(scene, radius, slices, stacks);
    }
    initBuffers() {
        super.initBuffers();
        this.initGLBuffers();
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.3, 0.5);
        super.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.5, 0.8, 0.5);
        super.display();
        this.scene.popMatrix();
    }
}