import { CGFobject } from '../../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param radius - Radius of the stem
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        for (let y = 0 ; y <= this.stacks ; y += 1) {
            this.vertices.push(1, y / this.stacks, 0);
            this.normals.push(1, 0, 0);
        }
        for (let i = 1 ; i <= this.slices ; i++) {
            let angle = 2 * Math.PI * i / this.slices;
            let x = Math.cos(angle);
            let z = Math.sin(angle);
            let vector_size = Math.sqrt(x * x + z * z);
            if (i != this.slices) {    
                this.vertices.push(x, 0, z);
                this.normals.push(x / vector_size, 0, z / vector_size);
            }
            for (let j = 1 ; j <= this.stacks ; j++) {
                if (i != this.slices) {
                    let y = j / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, 0, z / vector_size);
                    
                    let points = this.vertices.length / 3;
                    let indexC = points - 1;
                    let indexB = indexC - (this.stacks + 1);
                    let indexA = indexB - 1;
                    this.indices.push(indexA, points - 2, indexC, indexA, indexC, indexB);
                    this.indices.push(indexA, indexC, points - 2, indexA, indexB, indexC);

                    let s = i / this.slices;
                    let t = j / this.stacks;
                    this.texCoords.push(s, t);
                } else {
                    let points = this.vertices.length / 3;
                
                    let indexB = points - this.stacks - 1 + j;
                    let indexA = indexB - 1;
                    this.indices.push(indexA, j - 1, j, indexA, j, indexB);
                    this.indices.push(indexA, j, j - 1, indexA, indexB, j);
                    
                    let s = i / this.slices;
                    let t = j / this.stacks;
                    this.texCoords.push(s, t);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
