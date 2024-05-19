import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
      constructor(scene) {
            super(scene);
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.orientation = 0;
            this.speed = 0;
            this.init(scene);
            this.time = 0;
      }
      init(scene) {
            this.head = new MySphere(scene, 1, 32, 8);
            this.eye = new MySphere(scene, 1, 32, 8);
            this.thorax = new MySphere(scene, 1, 32, 8);
            this.abdomen = new MySphere(scene, 1, 32, 8);
            this.wing = new MySphere(scene, 1, 32, 8);
            this.antennae = new MySphere(scene, 1, 32, 8);
            this.leg = new MySphere(scene, 1, 32, 8);

            this.yellowMaterial = new CGFappearance(scene);
            this.yellowMaterial.setTexture(new CGFtexture(scene, 'images/body.png'));
            this.yellowMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.yellowMaterial.setAmbient(0.85, 0.7, 0, 1.0);
            this.yellowMaterial.setDiffuse(0.85, 0.7, 0, 1.0);
            this.yellowMaterial.setSpecular(0.95, 0.9, 0, 1.0);
            this.yellowMaterial.setShininess(10.0);

            this.eyeAppearance = new CGFappearance(scene);
            this.eyeAppearance.setTexture(new CGFtexture(scene, 'images/eye.png'));
            this.eyeAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
            this.eyeAppearance.setShininess(10.0);

            this.antennaeLegsAppearance = new CGFappearance(scene);
            this.antennaeLegsAppearance.setAmbient(0, 0, 0, 1.0);
            this.antennaeLegsAppearance.setDiffuse(0, 0, 0, 1.0);
            this.antennaeLegsAppearance.setSpecular(0, 0, 0, 1.0);
            this.antennaeLegsAppearance.setShininess(10.0);

            this.wingsAppearance = new CGFappearance(scene);
            this.wingsAppearance.setTexture(new CGFtexture(scene, 'images/wing.png'));
            this.wingsAppearance.setTextureWrap('REPEAT', 'REPEAT');
            this.wingsAppearance.setAmbient(1, 1, 1, 0);
            this.wingsAppearance.setDiffuse(1, 1, 1, 0.3);
            this.wingsAppearance.setSpecular(1, 1, 1, 0.3);
            this.wingsAppearance.setEmission(1, 1, 1, 0.3);
            this.wingsAppearance.setShininess(10.0);
      }
      update(t) {
            this.time = t / 1000;  // Convert milliseconds to seconds
        }
      display() {
            this.scene.pushMatrix();
            let oscillationHeight = Math.sin(this.time * 2 * Math.PI) * 0.5; // 1 second period
            this.scene.translate(0, oscillationHeight, 0);

            this.scene.pushMatrix();
            this.scene.translate(-3, 0, 0);
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.scene.scale(1.5, 1, 1);
            this.yellowMaterial.apply();
            this.head.display(); // head

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5); 

            this.scene.pushMatrix();
            this.scene.translate(0, 1, 1);
            this.eyeAppearance.apply();
            this.eye.display(); // right eye
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 1, -1);
            this.eye.display(); // left eye
            this.scene.popMatrix();
            
            this.scene.popMatrix();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // right antenna
            this.scene.translate(0, 1, 0);
            this.scene.rotate(Math.PI / 12, 0, -1, 0);
            this.scene.rotate(Math.PI / 2, 0, -1, 0);
            this.scene.scale(0.05, 0.05, 0.5);
            this.scene.translate(0, 0, 1);
            this.antennaeLegsAppearance.apply();
            this.antennae.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // left antenna
            this.scene.translate(0, 1, 0);
            this.scene.rotate(Math.PI / 12, 0, 1, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.scale(0.05, 0.05, 0.5);
            this.scene.translate(0, 0, -1);
            this.antennae.display();
            this.scene.popMatrix();

            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(3, -1, 0);
            this.scene.rotate(Math.PI / 4, 0, 0, -1);
            this.scene.scale(2, 1.5, 1.5);
            this.yellowMaterial.apply();
            this.abdomen.display(); // abdomen
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(2, 1, 1);
            this.thorax.display(); // thorax
            this.scene.popMatrix();

            this.scene.pushMatrix(); // front right leg
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.antennaeLegsAppearance.apply();
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // front left leg
            this.scene.rotate(Math.PI / 6, 0, -1, 0);
            this.scene.translate(0, 0, 1);
            this.scene.rotate(2 * Math.PI / 5, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, 1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // middle right leg
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // middle left leg
            this.scene.translate(0, 0, 1);
            this.scene.rotate(2 * Math.PI / 5, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, 1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // back right leg
            this.scene.rotate(Math.PI/6, 0, -1, 0);
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // back left leg
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
            this.scene.translate(0, 0, 1);
            this.scene.rotate(2 * Math.PI / 5, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, 1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.wingsAppearance.apply();

            this.scene.gl.enable(this.scene.gl.BLEND);
            this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);

            let wingAngle = Math.sin(this.time * 10 * Math.PI) * 0.3;//wing flaping
            this.scene.pushMatrix(); // front right wing
            this.scene.translate(-0.5, 0.5, 0);
            this.scene.rotate(wingAngle, 1, 0, 0);
            //this.scene.rotate(Math.PI / 12, 1, 1, 0);
            this.scene.scale(1, 0.1, 4);
            this.scene.translate(0, 0, -1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // front left wing
            this.scene.translate(-0.5, 0.5, 0);
            this.scene.rotate(-wingAngle, 1, 0, 0);
            //this.scene.rotate(Math.PI / 12, -1, -1, 0);
            this.scene.scale(1, 0.1, 4);
            this.scene.translate(0, 0, 1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // back right wing
            this.scene.translate(0.5, 0.5, 0);
            this.scene.rotate(wingAngle, 1, 0, 0);
            //this.scene.rotate(Math.PI / 12, 1, -1, 0);
            this.scene.scale(0.5, 0.1, 2);
            this.scene.translate(0, 0, -1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // back left wing
            this.scene.translate(0.5, 0.5, 0);
            this.scene.rotate(-wingAngle, 1, 0, 0);
            //this.scene.rotate(Math.PI / 12, -1, 1, 0);
            this.scene.scale(0.5, 0.1, 2);
            this.scene.translate(0, 0, 1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.gl.disable(this.scene.gl.BLEND)
            this.scene.popMatrix();
            
            this.scene.popMatrix();
      }
      enableNormalViz() {
            this.head.enableNormalViz();
            this.eye.enableNormalViz();
            this.thorax.enableNormalViz();
            this.abdomen.enableNormalViz();
            this.wing.enableNormalViz();
            this.antennae.enableNormalViz();
            this.leg.enableNormalViz();
      }
      disableNormalViz() {
            this.head.disableNormalViz();
            this.eye.disableNormalViz();
            this.thorax.disableNormalViz();
            this.abdomen.disableNormalViz();
            this.wing.disableNormalViz();
            this.antennae.disableNormalViz();
            this.leg.disableNormalViz();
      }
}
