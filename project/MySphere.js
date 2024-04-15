import { CGFobject } from '../../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - sphere radius
 * @param slices - number of divisions around the sphere
 * @param stacks - number of divisions between the poles of the sphere
 * @param inside - true if the sphere is inverted
 * @param north - factor to multiply the y coordinate of the north pole
 * @param south - factor to multiply the y coordinate of the south pole
 */
export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks, inside = false, north = 1, south = 1) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside ? -1 : 1;
        this.north = north;
        this.south = south;
        this.initBuffers();

    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        let angle;
        for (let h = 0; h <= this.stacks * 2; h += 1) {
            angle = - Math.PI / 2 + Math.PI * h / (2 * this.stacks);
            this.vertices.push(this.radius * Math.cos(angle), this.radius * Math.sin(angle), 0);
            this.normals.push(this.inside * Math.cos(angle), this.inside * Math.sin(angle), 0);
            this.texCoords.push(0, 1 - h / (this.stacks * 2));
        }
        let angleXZ, angleXY, x, y, z, points, index1, index2, index3, index4, y_factor;
        for (let i = 1; i <= this.slices + 1; i++) {
            angleXZ = 2 * Math.PI * i / this.slices;
            this.vertices.push(0, -this.radius , 0);
            this.texCoords.push(0, 1);
            this.normals.push(0, this.inside, 0);
            for (let j = 0; j <= this.stacks * 2; j++) {
                angleXY = - Math.PI / 2 + Math.PI * j / (2 * this.stacks);
                y_factor = angleXY >= 0 ? this.north : this.south;
                x = Math.cos(angleXZ) * Math.cos(angleXY);
                z = Math.sin(angleXZ) * Math.cos(angleXY);
                y = Math.sin(angleXY);
                this.vertices.push(this.radius * x, this.radius * y * y_factor, this.radius * z);
                this.normals.push(this.inside * x, this.inside * y, this.inside * z);
                this.texCoords.push(i / this.slices, 1 - j / (this.stacks * 2));
                points = this.vertices.length / 3;
                index3 = points - 2;
                index4 = points - 1;
                index2 = index4 - (this.stacks*2 + 1);
                index1 = index2 - 1;
                if (this.inside == -1) {
                    this.indices.push(index1, index3, index4, index1, index4, index2);
                } else {
                    this.indices.push(index4, index3, index1, index2, index4, index1);
                }
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
