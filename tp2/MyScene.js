import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
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

    // TP2 - Tangram
    this.tangram = new MyTangram(this);
    this.displayTangram = true;

    // TP2 - UnitCube
    this.unitCube = new MyUnitCube(this);
    this.displayUnitCube = true;

    // TP2 - Cube composed of Planes
    this.unitCubeQuad = new MyUnitCubeQuad(this);
    this.displayUnitCubeQuad = true;

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    // TP2 - Additional light
    this.lights[1].setPosition(5, 30, 7, 1);
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

    // TP2 - UnitCube
    this.pushMatrix();
    this.translate(5, 0, 7);
    this.rotate(-Math.PI / 2, 1, 0, 0);

    // TP2 - UnitCube - To prevent clipping
    this.pushMatrix();
    this.translate(0, 0, 0.5);

    // TP2 - Tangram
    if (this.displayTangram) this.tangram.display();

    // TP2 - UnitCube - To prevent clipping
    this.popMatrix();

    // TP2 - UnitCube
    this.pushMatrix();
    this.scale(10, 14, 1);
    this.translate(0, 0, -0.5);
    if (this.displayUnitCube) this.unitCube.display();

    // TP2 - Cube composed of Planes
    if (this.displayUnitCubeQuad) this.unitCubeQuad.display();

    // TP2 - UnitCube
    this.popMatrix();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
