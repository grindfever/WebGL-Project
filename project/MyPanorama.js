import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
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
		this.apperance = new CGFappearance(scene);
		this.apperance.setEmission(1, 1, 1, 1);
		this.apperance.setShininess(10.0);
		this.apperance.setTexture(this.texture);
		this.apperance.setTextureWrap('REPEAT', 'REPEAT');
		this.sphere = new MySphere(scene, 200, 40, 40, true);
	}
	display() {
		this.apperance.apply();
		this.sphere.display();
	}
}
