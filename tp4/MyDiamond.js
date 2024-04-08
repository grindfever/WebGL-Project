import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	  //0
			1.5, 0, 0,	  //1
			0, 1.5, 0,	  //2
			1.5, 1.5, 0,  //3
			
			// 0, 0, 0,	  //4
			// 1.5, 0, 0,	  //5
			// 0, 1.5, 0,	  //6
			// 1.5, 1.5, 0	  //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 2, 1,
			2, 1, 0,
			1, 2, 3
		];
/*
		this.normals = [
			0, 0, 1,    // normal to vertex 0
			0, 0, 1,    // normal to vertex 1
			0, 0, 1,    // normal to vertex 2
			0, 0, 1,    // normal to vertex 3
			0, 0, -1,   // normal to vertex 0
			0, 0, -1,   // normal to vertex 1
			0, 0, -1,   // normal to vertex 2
			0, 0, -1    // normal to vertex 3
		];
*/
		this.texCoords = [
			0, 0.5,
			0.25, 0.75, 
			0.25, 0.25,
			0.5, 0.5,
			// 0, 0.5,
			// 0.25, 0.75, 
			// 0.25, 0.25,
			// 0.5, 0.5,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

