import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyBeehive } from "./MyBeehive.js";
import { MyGrass} from "./MyGrass.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);

    // MySphere
    this.sphere = new MySphere(this, 1, 32, 16);

    // MyPanorama
    this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama4.jpg'));

    // MyGarden
    this.garden = new MyGarden(this, 3, 3);

    // MyRockSet
    this.rockSet = new MyRockSet(this, 30);

    // MyBee
    this.bee = new MyBee(this);

    // MyBeehive
    this.beehive = new MyBeehive(this);
    this.beehivePosition = [0, 0, 0];

    // MyGrass
    this.grassField = new MyGrass(this, 50); // 50x50 grass field 

    this.setUpdatePeriod(50);
    this.totalTime = Date.now();

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayGarden = true;
    this.displayRockSet = true;
    this.scaleFactor = 1;
    this.fov = 1;
    this.speedFactor = 1;
    this.enableTextures(true);

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(new CGFtexture(this, 'images/terrain.jpg'));
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.setShininess(10.0);

    // Earth texture
    this.appearance1 = new CGFappearance(this);
    this.appearance1.setTexture(new CGFtexture(this, 'images/earth.jpg'));
    this.appearance1.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance1.setShininess(10.0);

    this.beehiveAppearance = new CGFappearance(this);
    this.beehiveAppearance.setTexture(new CGFtexture(this, 'images/woodbeehive.jpg'));
    this.beehiveAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beehiveAppearance.setShininess(10.0);

    this.grassAppearance = new CGFappearance(this);
    this.grassAppearance.setTexture(new CGFtexture(this, 'images/leaf.png'));
    this.grassAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.grassAppearance.setShininess(10.0);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.5, 0.5, 0.8, 1.0);
    this.setDiffuse(0.4, 0.4, 0.8, 1.0);
    this.setSpecular(0.4, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  update(t) {
    let deltaTime = (t - this.totalTime) / 1000;
    this.checkKeys();
    this.bee.update(deltaTime);
  }
  checkKeys() {
    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(-0.01 * this.speedFactor); // Accelerate the bee
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.bee.accelerate(0.01 * this.speedFactor); // Decelerate the bee
    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.bee.turn(0.5 * this.speedFactor); // Turn the bee to the right
    }
    if (this.gui.isKeyPressed("KeyD")) {
      this.bee.turn(-0.5 * this.speedFactor); // Turn the bee to the left
    }
    if (this.gui.isKeyPressed("Space")) {
      this.bee.ascend(0.5 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("ShiftLeft")) {
      this.bee.ascend(-0.5 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      this.bee.position = [0, 20, 0];
      this.bee.orientation = 0;
      this.bee.velocity = [0, 0, 0];
    }
    if (this.gui.isKeyPressed("KeyF")) {
      if (!this.bee.pollen) {
        if (this.garden.flowers.length > 0) {
          var closestFlower = this.garden.flowers[0][0];
          var closestFlowerPosition = this.garden.flowersPositions[0][0];
          let closestDistance = Math.sqrt((this.bee.position[0] - closestFlowerPosition[0]) ** 2 + this.bee.position[1] ** 2 + (this.bee.position[2] - closestFlowerPosition[1]) ** 2);
          for (let i = 0; i < this.garden.numRows; i++) {
            for (let j = 0; j < this.garden.numCols; j++) {
              let distance = Math.sqrt((this.bee.position[0] - this.garden.flowersPositions[i][j][0]) ** 2 + this.bee.position[1] ** 2 + (this.bee.position[2] - this.garden.flowersPositions[i][j][1]) ** 2);
              if (distance < closestDistance){
                closestFlower = this.garden.flowers[i][j];
                closestFlowerPosition = this.garden.flowersPositions[i][j];
                closestDistance = distance;
              }
            }
          }
          this.bee.approachFlower(closestFlowerPosition, closestFlower);
        }
      }
    }
    if (this.gui.isKeyPressed("KeyP")) {
      if (!this.bee.pollen) {
        let closestFlower = null;
        for (let i = 0; i < this.garden.numRows; i++) {
          for (let j = 0; j < this.garden.numCols; j++) {
            let distance = Math.sqrt((this.bee.position[0] - this.garden.flowersPositions[i][j][0]) ** 2 + (this.bee.position[2] - this.garden.flowersPositions[i][j][1]) ** 2);
            if (distance <= 5) {
              closestFlower = this.garden.flowers[i][j];
              break;
            }
          }
          if (closestFlower != null) {
            break;
          }
        }
        if (closestFlower != null && closestFlower.pollen) {
          this.bee.collectPollen(closestFlower);
        }
      }
    }
    if (this.gui.isKeyPressed("KeyO")) {
      this.bee.hiveDropPollen(this.beehive, this.beehivePosition);
    }
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();   
    this.popMatrix();

    this.pushMatrix();
    this.displayNormals ? this.sphere.enableNormalViz() : this.sphere.disableNormalViz();
    this.appearance1.apply();
    this.translate(0, 50, 0);
    this.scale(10, 10, 10);
    this.sphere.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    this.pushMatrix();
    this.displayNormals ? this.garden.enableNormalViz() : this.garden.disableNormalViz();
    this.displayGarden ? this.garden.display() : null;
    this.popMatrix();

    this.pushMatrix();
    this.translate(-30, 0, 0);
    this.scale(5, 5, 5);
    this.displayNormals ? this.rockSet.enableNormalViz() : this.rockSet.disableNormalViz();
    this.displayRockSet ? this.rockSet.display() : null;
    this.popMatrix();

    this.pushMatrix();
    this.displayNormals ? this.bee.enableNormalViz() : this.bee.disableNormalViz();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-30, this.rockSet.currentLayer * 1.25, 0);
    this.scale(5, 5, 5);
    this.beehivePosition = [-30, this.rockSet.currentLayer * 1.25, 0];
    this.displayNormals ? this.rockSet.enableNormalViz() : this.rockSet.disableNormalViz();
    this.beehiveAppearance.apply();
    this.beehive.display();
    this.popMatrix();

    this.pushMatrix();
    this.grassAppearance.apply();
    this.grassField.display();
    this.popMatrix();

    // Update the camera's field of view
    this.camera.fov = this.fov;

    // ---- END Primitive drawing section
  }
}
