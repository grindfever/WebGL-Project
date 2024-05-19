import { CGFobject } from '../../lib/CGF.js';

/**
 * MyEllipse
 * @constructor
 * @param scene - Reference to MyScene object
 * @param majorAxis - Major axis of the ellipse
 * @param minorAxis - Minor axis of the ellipse
 * @param slices - Number of divisions around the ellipse
 * @param stacks - Number of divisions along the ellipse
 */
export class MyBeehive extends CGFobject {
    constructor(scene, majorAxis, minorAxis, slices, stacks) {
        super(scene);
        this.majorAxis = majorAxis;
        this.minorAxis = minorAxis;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle;
        for (let j = 0; j <= this.stacks; j++) {
            angle = Math.PI / 2 - (Math.PI * j) / this.stacks;
            for (let i = 0; i <= this.slices; i++) {
                let x = Math.cos((Math.PI * 2 * i) / this.slices) * this.majorAxis;
                let y = Math.sin(angle) * this.minorAxis;
                let z = Math.sin((Math.PI * 2 * i) / this.slices) * this.majorAxis;
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(i / this.slices, j / this.stacks);
            }
        }

        for (let j = 0; j < this.stacks; j++) {
            for (let i = 0; i < this.slices; i++) {
                let first = j * (this.slices + 1) + i;
                let second = first + this.slices + 1;
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
