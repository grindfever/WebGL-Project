import { CGFobject } from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param radius - Radius of the cylinder
 */
export class MyCylinder extends CGFobject {
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
            this.vertices.push(this.radius, y / this.stacks, 0);
            this.normals.push(1, 0, 0);
        }
        for (let i = 1 ; i <= this.slices ; i++) {
            let angle = 2 * Math.PI * i / this.slices;
            let x = this.radius * Math.cos(angle);
            let z = this.radius * Math.sin(angle);
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

                    this.texCoords.push(i / this.slices, j / this.stacks);
                } else {
                    let points = this.vertices.length / 3;
                
                    let indexB = points - this.stacks - 1 + j;
                    let indexA = indexB - 1;
                    this.indices.push(indexA, j - 1, j, indexA, j, indexB);
                    this.indices.push(indexA, j, j - 1, indexA, indexB, j);
                    
                    this.texCoords.push(i / this.slices, j / this.stacks);
                }
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
