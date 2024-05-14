import { MySphere } from './MySphere.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - rock radius
 * @param slices - number of divisions around the rock
 * @param stacks - number of divisions between the poles of the rock
 * @param inside - true if the rock is inverted
 * @param north - factor to multiply the y coordinate of the north pole
 * @param south - factor to multiply the y coordinate of the south pole
 */
export class MyRock extends MySphere {
    constructor(scene, radius, slices, stacks, inside = false, north = 1, south = 1) {
        super(scene, radius, slices, stacks, inside, north, south);
    }

    initBuffers() {
        super.initBuffers();

        // Introduce perturbations to the vertices
        for (let i = 0; i < this.vertices.length; i += 3) {
            let normalIndex = i;
            let perturbationFactor = (Math.random() * 0.2) - 0.1; // Perturbation factor between -0.1 and 0.1
            this.vertices[i] += this.normals[normalIndex] * perturbationFactor;
            this.vertices[i + 1] += this.normals[normalIndex + 1] * perturbationFactor;
            this.vertices[i + 2] += this.normals[normalIndex + 2] * perturbationFactor;
        }

        // Re-initialize the GL buffers
        this.initGLBuffers();
    }
}
