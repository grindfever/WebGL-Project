import { CGFobject } from '../../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param angle - Angle of rotation of the petal
 */
export class MyPetal extends CGFobject {
    constructor(scene, angle) {
        super(scene);
        this.angle = angle;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,	                                                                                //0
            -0.5, 1, 0,	                                                                                //1
            0.5, 1, 0,	                                                                                //2
            0, 2 * Math.abs(Math.cos(2 * Math.PI * this.angle)), Math.sin(2 * Math.PI * this.angle),	//3
            0, 0, 0,	                                                                                //4
            -0.5, 1, 0,	                                                                                //5
            0.5, 1, 0,                                                                                  //6
            0, 2 * Math.abs(Math.cos(2 * Math.PI * this.angle)), Math.sin(2 * Math.PI * this.angle)     //7
        ];
        console.log(this.vertices);
        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2, 1, 0,
            1, 2, 3,
            3, 2, 1
        ];
        
        this.normals = [
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, -2 * Math.sin(2 * Math.PI * this.angle), -Math.cos(2 * Math.PI * this.angle),
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 2 * Math.sin(2 * Math.PI * this.angle), Math.cos(2 * Math.PI * this.angle)
        ];
        console.log(this.normals);
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
    updateAngle(angle){
        this.angle = angle;
        this.initBuffers();
    }
}
