import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
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
    this.sphere = new MySphere(this, 1, 40, 40);

    // MyPanorama
    this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama4.jpg'));

    // MyFlower
    this.flower = new MyFlower(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.scaleFactor = 1;
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
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI/2.0, 1, 0,0);
    this.plane.display();   
    this.popMatrix();

    this.pushMatrix();
    if (this.displayNormals) {
      this.sphere.enableNormalViz();
    } else {
      this.sphere.disableNormalViz();
    }
    this.appearance1.apply();
    //this.sphere.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    this.flower.display();
    
    // ---- END Primitive drawing section
  }
}
