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
        -0.5, -0.5, -0.5,  //0
        0.5, -0.5, -0.5,   //1
        -0.5, 0.5, -0.5,   //2
        0.5, 0.5, -0.5,    //3
        -0.5, -0.5, 0.5,   //4
        0.5, -0.5, 0.5,    //5
        -0.5, 0.5, 0.5,    //6
        0.5, 0.5, 0.5,     //7
    ];

    //Counter-clockwise reference of vertices
    this.indices = [
        0, 1, 2, //Front face
        3, 2, 1,
        4, 5, 6, //Back face
        7, 6, 5,
        0, 2, 4, //Left face
        6, 4, 2,
        3, 5, 1, //Right face
        5, 3, 7,
        6, 3, 2, //Top face
        3, 6, 7,
        4, 1, 0, //Bottom face
        1, 4, 5
    ];

    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
}
}
