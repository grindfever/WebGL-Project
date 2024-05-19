import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyPollen } from './MyPollen.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        let petalCount = Math.trunc(10 * Math.random());
        this.petalCount = petalCount < 3 ? 3 : petalCount > 10 ? 10 : petalCount;

        let random = Math.random();
        this.outerRadius = random * 10 < 3 ? 3 : random * 10 > 7 ? 7 : random * 10;
        this.heartRadius = random < 0.5 ? 0.5 : random;
        this.stemRadius = random * 2 < 1 ? 1 : random * 2 > 1.5 ? 1.5 : random * 2;
        this.stemCount = Math.round(2 * Math.random()) + 1;
        this.stemHeight = [];
        this.stemHeightTotal = 0;
        for (let i = 0; i < this.stemCount; i++) {
            let random1 = Math.random();
            this.stemHeight[i] = random1 * 2 < 1 ? 1 : random1 * 2 > 1.5 ? 1.5 : random1 * 2;
            this.stemHeightTotal += this.stemHeight[i];
        }

        this.random1 = Math.random();
        this.rotationAngle = this.random1 < 0.5 ? 0.5 : this.random1;

        let petalTexture = Math.round(5 * Math.random());
        this.petalTexture = petalTexture < 1 ? 1 : petalTexture > 5 ? 5 : petalTexture;
        this.petalColor = [Math.random(), Math.random(), Math.random()];
        
        let random2 = Math.random();
        if (this.petalCount == 3) {
            this.petalThin = random2 < 0.3 ? 0.3 : random2;
        } else if (this.petalCount == 4) {
            this.petalThin = random2 < 0.6 ? 0.6 : random2;
        } else if (this.petalCount == 5) {
            this.petalThin = random2 < 0.7 ? 0.7 : random2;
        } else if (this.petalCount == 6) {
            this.petalThin = 2 * random2 < 0.8 ? 0.8 : 2 * random2;
        } else if (this.petalCount == 7) {
            this.petalThin = 2 * random2 < 1 ? 1 : 2 * random2;
        } else if (this.petalCount == 8) {
            this.petalThin = 2 * random2 < 1.2 ? 1.2 : 2 * random2;
        } else if (this.petalCount == 9) {
            this.petalThin = 2 * random2 < 1.5 ? 1.5 : 2 * random2;
        } else if (this.petalCount == 10) {
            this.petalThin = 2 * random2 < 1.6 ? 1.6 : 2 * random2;
        }
        this.init(scene);
    }
    init(scene) {
        this.stem = new MyStem(scene, this.stemRadius, this.stemCount, this.stemHeight);
        this.petal = new MyPetal(this.scene, this.rotationAngle);
        this.receptacle = new MyReceptacle(scene, this.heartRadius);
        this.pollen = new MyPollen(scene, 1, 32, 16);

        this.stemAppearance = new CGFappearance(scene);
		this.stemAppearance.setTexture(new CGFtexture(scene, 'images/stem.png'));
		this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.stemAppearance.setShininess(10.0);

        this.receptacleAppearance = new CGFappearance(scene);
        this.receptacleAppearance.setTexture(new CGFtexture(scene, 'images/receptacle.png'));
        this.receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleAppearance.setShininess(10.0);
        this.receptacleAppearance.setAmbient(0.7, 0.7, 0.7, 1);

        this.petalAppearance = new CGFappearance(scene);
        this.petalAppearance.setColor(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1);
        this.petalAppearance.setTexture(new CGFtexture(scene, 'images/petal' + this.petalTexture + '.png'));
        this.petalAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.petalAppearance.setShininess(10.0);

        this.pollenAppearance = new CGFappearance(scene);
        this.pollenAppearance.setTexture(new CGFtexture(scene, 'images/pollen.png'));
        this.pollenAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenAppearance.setShininess(10.0);
    }
    display() {
        this.scene.scale(this.outerRadius, this.outerRadius, this.outerRadius);

        this.scene.pushMatrix();
        this.scene.scale(0.1, 1, 0.1);
        this.stemAppearance.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.stemHeightTotal, 0);
        this.receptacleAppearance.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.stemHeightTotal + 0.6 * this.heartRadius, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(this.rotationAngle, 0, 0, 1);
        this.pollenAppearance.apply();
        this.pollen.display();
        this.scene.popMatrix();

        for (let i = 1; i <= this.petalCount; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0, -this.stemHeightTotal);            
            this.scene.rotate(i * 2 * Math.PI / this.petalCount, 0, 0, 1);
            this.scene.scale(1, this.petalThin, 1);
            this.petalAppearance.apply();
            this.petal.display();
            this.scene.popMatrix();
        }
    }
    enableNormalViz() {
        this.stem.enableNormalViz();
        this.petal.enableNormalViz();
        this.receptacle.enableNormalViz();
    }
    disableNormalViz() {
        this.stem.disableNormalViz();
        this.petal.disableNormalViz();
        this.receptacle.disableNormalViz();
    }
}
