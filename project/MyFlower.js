import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MyReceptacle } from './MyReceptacle.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param stemRadius - Radius of the stem
 * @param stemCount - Number of divisions of the stem
 */
export class MyFlower extends CGFobject {
    constructor(scene, stemRadius, stemCount) {
        super(scene);
        let petalCount = Math.trunc(10 * Math.random());
        this.petalCount = petalCount < 3 ? 3 : petalCount > 10 ? 10 : petalCount;

        let random = Math.random();
        this.outerRadius = random * 2 < 1 ? 1 : random * 2;
        this.heartRadius = random * 2 < 1 ? 1 : random * 2 > 1.5 ? 1.5 : random * 2;
        this.stemRadius = stemRadius;
        this.stemCount = stemCount;

        let random1 = Math.random();
        this.rotationAngle = random1 < 0.5 ? 0.5 : random1;

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
        this.stem = new MyStem(scene, 20, 30, this.stemRadius);
        this.petal = new MyPetal(this.scene, this.rotationAngle);
        this.receptacle = new MyReceptacle(scene, this.heartRadius);

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
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 1, 0.1);
        this.stemAppearance.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.receptacleAppearance.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        for (let i = 1; i <= this.petalCount; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0, -1);            
            this.scene.rotate(i * 2 * Math.PI / this.petalCount, 0, 0, 1);
            this.scene.scale(this.outerRadius, this.outerRadius * this.petalThin, this.outerRadius);
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
    updatePetalAngle(angle) {
        this.petal.updateAngle(angle);
    }
}