import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyDiamond } from './MyDiamond.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init(scene);
        this.initMaterials(scene);
    }
    init(scene) {
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.diamond = new MyDiamond(scene);
    }
    initMaterials(scene) {
        // Triangle green material
        this.diamondMaterial = new CGFappearance(scene);
        this.diamondMaterial.setAmbient(0.0, 0.7, 0.0, 1.0);
        this.diamondMaterial.setDiffuse(0.0, 0.7, 0.0, 1.0)
        this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondMaterial.setShininess(10.0);

        // Triangle purple material
        this.trianglePurpleMaterial = new CGFappearance(scene);
        this.trianglePurpleMaterial.setAmbient(0.5, 0, 0.5, 1.0);
        this.trianglePurpleMaterial.setDiffuse(0.5, 0, 0.5, 1.0)
        this.trianglePurpleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePurpleMaterial.setShininess(10.0);

        // Triangle pink material
        this.trianglePinkMaterial = new CGFappearance(scene);
        this.trianglePinkMaterial.setAmbient(1.0, 0.75, 0.8, 1.0);
        this.trianglePinkMaterial.setDiffuse(1.0, 0.75, 0.8, 1.0);
        this.trianglePinkMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePinkMaterial.setShininess(10.0);

        // Triangle orange material
        this.triangleOrangeMaterial = new CGFappearance(scene);
        this.triangleOrangeMaterial.setAmbient(0.7, 0.4, 0.0, 1.0);
        this.triangleOrangeMaterial.setDiffuse(0.7, 0.4, 0.0, 1.0)
        this.triangleOrangeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleOrangeMaterial.setShininess(10.0);

        // Triangle blue material
        this.triangleBlueMaterial = new CGFappearance(scene);
        this.triangleBlueMaterial.setAmbient(0.0, 0.0, 0.7, 1.0);
        this.triangleBlueMaterial.setDiffuse(0.0, 0.0, 0.7, 1.0)
        this.triangleBlueMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBlueMaterial.setShininess(10.0);

        // Triangle red material
        this.triangleRedMaterial = new CGFappearance(scene);
        this.triangleRedMaterial.setAmbient(1, 0, 0, 1.0);
        this.triangleRedMaterial.setDiffuse(1, 0, 0, 0);
        this.triangleRedMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleRedMaterial.setShininess(10.0);        

        // Parallelogram material
        this.paralellogramMaterial = new CGFappearance(scene);
        this.paralellogramMaterial.setAmbient(0.7, 0.7, 0.0, 1.0);
        this.paralellogramMaterial.setDiffuse(0.7, 0.7, 0.0, 1.0);
        this.paralellogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.paralellogramMaterial.setShininess(10.0);
    }
    display() {
        // Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.trianglePurpleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(2, 2, 2);
        this.triangleOrangeMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(2, 2, 2);
        this.triangleBlueMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(1.5, 1.5, 1.5);
        this.trianglePinkMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Red Triangle
        this.triangleRedMaterial.apply();
        this.triangle.display();

        // Green Square
        this.scene.pushMatrix();
        this.scene.translate(-0.75, 1.5, 0);
        //this.diamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate((-3 * Math.PI) / 5, 0, 0, 1);
        this.paralellogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    }
    enableNormalViz() {
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.diamond.enableNormalViz();
    }
    disableNormalViz() {
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.diamond.disableNormalViz();
    }
}
