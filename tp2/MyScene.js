import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MySquare } from "./MySquare.js";

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

    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.square = new MySquare(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    // TP1 - Ex 1 - Part 4 - Additional light
    this.lights[1].setPosition(-30, -2, -5, -1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
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

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    // TP2 - Tangram
    // Purple Triangle
    this.pushMatrix();
    this.translate(0, -2, 0);
    this.triangle.display();
    this.popMatrix();

    // Orange Triangle
    this.pushMatrix();
    this.translate(1, -1, 0);
    this.rotate(Math.PI, 0, 0, 1);
    this.scale(2, 2, 2);
    this.triangle.display();
    this.popMatrix();

    // Blue Triangle
    this.pushMatrix();
    this.translate(0, -2, 0);
    this.rotate(-Math.PI / 2, 0, 0, 1);
    this.scale(2, 2, 2);
    this.triangle.display();
    this.popMatrix();

    // Pink Triangle
    this.pushMatrix();
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.scale(1.5, 1.5, 1.5);
    this.triangle.display();
    this.popMatrix();

    // Red Triangle
    this.triangle.display();

    // Green Square
    this.pushMatrix();
    this.translate(-0.75, 1.5, 0);
    this.square.display();
    this.popMatrix();

    // Yellow Parallelogram
    this.pushMatrix();
    this.translate(0, 3, 0);
    this.scale(1, -1, 1);
    this.rotate((-3 * Math.PI) / 5, 0, 0, 1);
    this.parallelogram.display();
    this.popMatrix();
    
    // ---- END Primitive drawing section
  }
}
