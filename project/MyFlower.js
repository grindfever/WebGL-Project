import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init(scene);
    }
    init(scene) {
        this.stem = new MyStem(scene, 20, 20);
        this.petal = new MyPetal(scene);
        this.receptacle = new MyReceptacle(scene);

        this.stemAppearance = new CGFappearance(scene);
		this.stemAppearance.setTexture(new CGFtexture(scene, 'images/stem.png'));
		this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.stemAppearance.setShininess(10.0);

        this.receptacleAppearance = new CGFappearance(scene);
        this.receptacleAppearance.setTexture(new CGFtexture(scene, 'images/receptacle.png'));
        this.receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleAppearance.setShininess(10.0);
        this.receptacleAppearance.setAmbient(0.5, 0.5, 0.5, 1);

        this.petalAppearance = new CGFappearance(scene);
        this.petalAppearance.setTexture(new CGFtexture(scene, 'images/petal.png'));
        this.petalAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.petalAppearance.setShininess(10.0);
        this.petalAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 1, 0.1);
        this.stemAppearance.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.receptacleAppearance.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petalAppearance.apply();
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 3, 0, 0, 1);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(2 * Math.PI / 3, 0, 0, 1);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(4 * Math.PI / 3, 0, 0, 1);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(5 * Math.PI / 3, 0, 0, 1);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.6, 0.6, 0.6);
        this.petal.display();
        this.scene.popMatrix();
    }
}
