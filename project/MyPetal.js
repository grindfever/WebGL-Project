import { CGFobject } from '../../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,	                        //0
            -this.radius / 2, this.radius, 0,   //1
            this.radius / 2, this.radius, 0,    //2
            0, this.radius * 2, 0,	            //3
            0, 0, 0,	                        //4
            -this.radius / 2, this.radius, 0,	//5
            this.radius / 2, this.radius, 0,    //6
            0, this.radius * 2, 0               //7
        ];
        
        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
            1, 2, 3,
            3, 2, 0,
            0, 1, 3
        ];
        
        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ];

        this.texCoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 1,
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
