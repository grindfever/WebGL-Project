import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRock } from "./MyRock.js";

export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        // Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 30);
        this.sphere = new MySphere(this, 1, 32, 16);
        this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama4.jpg'));
        this.garden = new MyGarden(this, 1, 1);
        this.rockSet = new MyRockSet(this, 200);
        this.rock = new MyRock(this, 1,32,16);

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.displayGarden = true;
        this.displayRock=true;
        this.displayRockSet = true;
        this.scaleFactor = 1;
        this.fov = 1;
        this.enableTextures(true);

        this.appearance = new CGFappearance(this);
        this.appearance.setTexture(new CGFtexture(this, 'images/terrain.jpg'));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setShininess(10.0);

        this.appearance1 = new CGFappearance(this);
        this.appearance1.setTexture(new CGFtexture(this, 'images/earth.jpg'));
        this.appearance1.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance1.setShininess(10.0);

        // Rock appearance
      	this.rockAppearance = new CGFappearance(this);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.rockAppearance.setShininess(10.0);

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
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();

        if (this.displayAxis) this.axis.display();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

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
        // this.sphere.display(); // Uncomment if you want to display the sphere
        this.popMatrix();

        this.pushMatrix();
        this.panorama.display();
        this.popMatrix();

        this.pushMatrix();
        this.displayNormals ? this.garden.enableNormalViz() : this.garden.disableNormalViz();
        if (this.displayGarden) this.garden.display();
        this.popMatrix();

        this.pushMatrix();
        if (this.displayRockSet) this.rockSet.display();
        this.popMatrix();
    
          this.pushMatrix();
          this.rockAppearance.apply();
          if(this.displayRock)this.rock.display();
          this.popMatrix();

        // Update the camera's field of view
        this.camera.fov = this.fov;
    }
}
