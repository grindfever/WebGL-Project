import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
    initBuffers() {
        this.vertices = [
            // Front face
            -0.5, -0.5, -0.5,  //0
            0.5, -0.5, -0.5,   //1
            -0.5, 0.5, -0.5,   //2
            0.5, 0.5, -0.5,    //3
            // Back face
            -0.5, -0.5, 0.5,   //4
            0.5, -0.5, 0.5,    //5
            -0.5, 0.5, 0.5,    //6
            0.5, 0.5, 0.5,     //7
            // Left face
            -0.5, -0.5, -0.5,  //8
            -0.5, 0.5, -0.5,   //9
            -0.5, -0.5, 0.5,   //10
            -0.5, 0.5, 0.5,    //11
            // Right face
            0.5, -0.5, -0.5,   //12
            0.5, 0.5, -0.5,    //13
            0.5, -0.5, 0.5,    //14
            0.5, 0.5, 0.5,     //15
            // Top face
            -0.5, 0.5, -0.5,   //16
            0.5, 0.5, -0.5,    //17
            -0.5, 0.5, 0.5,    //18
            0.5, 0.5, 0.5,     //19
            // Bottom face
            -0.5, -0.5, -0.5,  //20
            0.5, -0.5, -0.5,   //21
            -0.5, -0.5, 0.5,   //22
            0.5, -0.5, 0.5,    //23
        ];
    
        this.normals = [
            // Front face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // Back face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Left face
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // Top face
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // Front face
            0, 1, 2,
            2, 1, 0,
            1, 3, 2,
            2, 3, 1,
            // Back face
            4, 5, 6,
            6, 5, 4,
            5, 7, 6,
            6, 7, 5,
            // Left face
            8, 9, 10,
            10, 9, 8,
            9, 11, 10,
            10, 11, 9,
            // Right face
            12, 13, 14,
            14, 13, 12,
            13, 15, 14,
            14, 15, 13,
            // Top face
            16, 17, 18,
            18, 17, 16,
            17, 19, 18,
            18, 19, 17,
            // Bottom face
            20, 21, 22,
            22, 21, 20,
            21, 23, 22,
            22, 23, 21
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
