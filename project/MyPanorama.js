import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyPlane
* @constructor
* @param scene - Reference to MyScene object
* @param texture - Reference to CGFtexture object
*/
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
		this.texture = texture;
		this.init(scene);
	}
	init(scene) {
		this.appearance = new CGFappearance(scene);
		this.appearance.setEmission(1, 1, 1, 1);
		this.appearance.setShininess(10.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.sphere = new MySphere(scene, 200, 32, 16, true);
	}
	display() {
		this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
		this.appearance.apply();
		this.sphere.display();
	}
}
