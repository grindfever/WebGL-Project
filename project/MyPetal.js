import { CGFobject } from '../../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, -0.5, 0,	    //0
            -0.5, 0.5, 0,	//1
            0.5, 0.5, 0,	//2
            0, 1.5, 0,	    //3
            0, 0, 0,	    //4
            -0.5, 0.5, 0,	//5
            0.5, 0.5, 0,    //6
            0, 2, 0,	    //7
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
            0, -1, 0,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
