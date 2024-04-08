import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene, textureCoords) {
        super(scene);
        this.texCoords = textureCoords;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			1, -1, 0,   //2
            0, 0, 0,	//3
            1, 1, 0,	//4
            1, -1, 0    //5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
			0, 1, 2
		];

		this.normals = [
			0, 0, 1,    // normal to vertex 0
			0, 0, 1,    // normal to vertex 1
			0, 0, 1,    // normal to vertex 2
            0, 0, -1,   // normal to vertex 0
            0, 0, -1,   // normal to vertex 1
            0, 0, -1    // normal to vertex 2
		];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}