import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param textureTop - Reference to CGFtexture object
 * @param textureFront - Reference to CGFtexture object
 * @param textureRight - Reference to CGFtexture object
 * @param textureBack - Reference to CGFtexture object
 * @param textureLeft - Reference to CGFtexture object
 * @param textureBottom - Reference to CGFtexture object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textureTop, textureFront, textureRight, textureBack, textureLeft, textureBottom) {
        super(scene);
        this.init(scene);
        this.initTextures(textureTop, textureFront, textureRight, textureBack, textureLeft, textureBottom);
    }
    init(scene) {
        this.quad = new MyQuad(scene);
    }
    initTextures(textureTop, textureFront, textureRight, textureBack, textureLeft, textureBottom) {
        this.textureTop = textureTop;
        this.textureFront = textureFront;
        this.textureRight = textureRight;
        this.textureBack = textureBack;
        this.textureLeft = textureLeft;
        this.textureBottom = textureBottom;
    }
    display() {
        // Top Face
        this.scene.pushMatrix()
        this.scene.translate(0, 0.5, 0)
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0)
        this.textureTop.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        // Front Face
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.textureFront.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        // Right Face
        this.scene.pushMatrix()
        this.scene.translate(0, 0, -0.5)
        this.scene.rotate(Math.PI, 0, 1, 0)
        this.textureRight.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        // Back Face
        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
        this.textureBack.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
        
        // Left Face
        this.scene.pushMatrix()
        this.scene.translate(0, 0, 0.5)
        this.textureLeft.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        // Bottom Face
        this.scene.pushMatrix()
        this.scene.translate(0, -0.5, 0)
        this.scene.rotate(Math.PI/2 , 1, 0, 0)
        this.textureBottom.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()
    }
}
