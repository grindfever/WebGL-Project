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
            this.position = [0, 20, 0];
            this.orientation = 0;
            this.velocity = [0, 0, 0];
            this.time = 0;
            this.pollen = null;
            this.init(scene);
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
            this.time = t;
            this.position[0] += this.velocity[0] * t;
            this.position[1] += this.velocity[1] * t;
            this.position[2] += this.velocity[2] * t;
      }
      turn(v) {
            this.orientation += v;
    
            // Maintain orientation within [0, 2*pi)
            if (this.orientation >= 2 * Math.PI) {
                  this.orientation -= 2 * Math.PI;
            } else if (this.orientation < 0) {
                  this.orientation += 2 * Math.PI;
            }

            let norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2 + this.velocity[2] ** 2);
            this.velocity[0] = Math.cos(-this.orientation) * norm;
            this.velocity[2] = Math.sin(-this.orientation) * norm;
      }
      accelerate(v) {
            let norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2 + this.velocity[2] ** 2);
            if (norm - v >= 0) {
                  this.velocity[0] = this.velocity[0] - Math.cos(-this.orientation) * v;
                  this.velocity[1] = this.velocity[1];
                  this.velocity[2] = this.velocity[2] - Math.sin(-this.orientation) * v;
            } else {
                  this.velocity[0] = 0;
                  this.velocity[1] = 0;
                  this.velocity[2] = 0;
            }
      }
      ascend(v) {
            this.position[1] += v;
      }
      approachFlower(flowerPosition, flower) {
            this.velocity[0] = flowerPosition[0] - this.position[0];
            this.velocity[2] = flowerPosition[1] - this.position[2];
        console.log(this.velocity);
            if (this.velocity[0] !== 0 && this.velocity[2] !== 0) {
                this.orientation = Math.atan2(-this.velocity[2], this.velocity[0]);
            }

            if (this.position[1] > (flower.stemHeightTotal + 3) * 2) {
                this.ascend(-1)
            } else if (this.position[1] < (flower.stemHeightTotal + 3) * 2) {
                this.ascend(1);
            }
        
            // Check if the bee is close enough to the flower
            const distanceThreshold = 10;
            const distance = Math.sqrt((this.position[0] - flowerPosition[0]) ** 2 + this.position[1] ** 2 + (this.position[2] - flowerPosition[1]) ** 2);
            if (distance < distanceThreshold) {
                this.velocity = [0, 0, 0];
            }
            console.log(this.velocity);
      }
      collectPollen(flower) {
            this.pollen = flower.pollen;
            flower.pollen = null;
      }
      hiveDropPollen(hive, hivePosition) {
            if (this.pollen) {
                  const speed = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2 + this.velocity[2] ** 2);
                  this.velocity[0] = hivePosition[0] - this.position[0];
                  this.velocity[1] = hivePosition[1] - this.position[1];
                  this.velocity[2] = hivePosition[2] - this.position[2];
      
                  if (this.velocity[0] !== 0 && this.velocity[2] !== 0) {
                      this.orientation = Math.atan2(-this.velocity[2], this.velocity[0]);
                  }
      
                  this.velocity = vec3.normalize(this.velocity, this.velocity);
                  this.velocity[0] = this.velocity[0] * speed;
                  this.velocity[1] = this.velocity[1] * speed;
                  this.velocity[2] = this.velocity[2] * speed;
      
                  // Check if the bee is close enough to the hive
                  const distanceThreshold = 30;
                  const distance = Math.sqrt((this.position[0] - hivePosition[0]) ** 2 + (this.position[1]  - hivePosition[1]) ** 2 + (this.position[2] - hivePosition[1]) ** 2);
                  if (distance < distanceThreshold) {
                      hive.addPollen(this.pollen);
                      this.pollen = null;
                      this.velocity = vec3.fromValues(0, 0, 0);
                  }
            }
      
      }
      display() {
            this.scene.translate(0, Math.sin(this.time * 2 * Math.PI) * 0.5, 0);
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.scene.rotate(Math.PI, 0, 1, 0);

            this.scene.pushMatrix();
            this.scene.translate(-3, 0, 0);
            
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.scene.scale(1.5, 1, 1);
            this.yellowMaterial.apply();
            this.head.display(); // Head

            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5); 

            this.scene.pushMatrix();
            this.scene.translate(0, 1, 1);
            this.eyeAppearance.apply();
            this.eye.display(); // Right eye
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 1, -1);
            this.eye.display(); // Left eye
            this.scene.popMatrix();
            
            this.scene.popMatrix();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Right antenna
            this.scene.translate(0, 1, 0);
            this.scene.rotate(Math.PI / 12, 0, -1, 0);
            this.scene.rotate(Math.PI / 2, 0, -1, 0);
            this.scene.scale(0.05, 0.05, 0.5);
            this.scene.translate(0, 0, 1);
            this.antennaeLegsAppearance.apply();
            this.antennae.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Left antenna
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
            this.abdomen.display(); // Abdomen
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(2, 1, 1);
            this.thorax.display(); // Thorax
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Front right leg
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.antennaeLegsAppearance.apply();
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Front left leg
            this.scene.rotate(Math.PI / 6, 0, -1, 0);
            this.scene.translate(0, 0, 1);
            this.scene.rotate(2 * Math.PI / 5, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, 1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Middle right leg
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Middle left leg
            this.scene.translate(0, 0, 1);
            this.scene.rotate(2 * Math.PI / 5, 1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, 1);
            this.leg.display();
            this.scene.popMatrix();

            if (this.pollen) {
                this.scene.pushMatrix();
                this.scene.translate(0, -2, 0);
                this.scene.scale(0.5, 0.5, 0.5);
                this.pollen.display();
                this.scene.popMatrix();
            }

            this.scene.pushMatrix(); // Back right leg
            this.scene.rotate(Math.PI/6, 0, -1, 0);
            this.scene.translate(0, 0, -1);
            this.scene.rotate(2 * Math.PI / 5, -1, 0, 0);
            this.scene.scale(0.1, 0.1, 1);
            this.scene.translate(0, 0, -1);
            this.leg.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Back left leg
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

            let wingAngle = Math.sin(this.time * 10 * Math.PI) * 0.3; // Wing flapping
            this.scene.pushMatrix(); // Front right wing
            this.scene.translate(-0.7, 0.5, 0);
            this.scene.rotate(wingAngle, 1, 0, 0);
            this.scene.scale(1, 0.1, 4);
            this.scene.translate(0, 0, -1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Front left wing
            this.scene.translate(-0.7, 0.5, 0);
            this.scene.rotate(-wingAngle, 1, 0, 0);
            this.scene.scale(1, 0.1, 4);
            this.scene.translate(0, 0, 1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Back right wing
            this.scene.translate(0.8, 0.5, 0);
            this.scene.rotate(wingAngle, 1, 0, 0);
            this.scene.scale(0.5, 0.1, 2);
            this.scene.translate(0, 0, -1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); // Back left wing
            this.scene.translate(0.8, 0.5, 0);
            this.scene.rotate(-wingAngle, 1, 0, 0);
            this.scene.scale(0.5, 0.1, 2);
            this.scene.translate(0, 0, 1);
            this.wing.display();
            this.scene.popMatrix();

            this.scene.gl.disable(this.scene.gl.BLEND)
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
