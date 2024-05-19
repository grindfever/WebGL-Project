import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyRock } from './MyRock.js';
/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numRocks - Number of rocks in the set
 */
export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.scene = scene;
        this.numRocks = numRocks;
        this.rocks = [];
        this.currentLayer = 0;
        this.initRocks();
        this.initAppearance();
        
    }
    initAppearance() {
        // Rock appearance
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setTexture(new CGFtexture(this.scene, 'images/rock.png'));
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
        this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.rockAppearance.setShininess(10.0);
    }
    initRocks() {
        let remainingRocks = this.numRocks;
        let totalRocksUsed = 0;
      
        // Calculate the maximum number of complete layers we can build
        while (true) {
            const rocksInNextLayer = (this.currentLayer + 1) ** 2;
            if (totalRocksUsed + rocksInNextLayer > this.numRocks) break;
            totalRocksUsed += rocksInNextLayer;
            this.currentLayer++;
        }
        // Place rocks for each layer
        for (let layer = 0; layer < this.currentLayer; layer++) {
            const layerSize = this.currentLayer - layer;
            const layerHeight = layer * 0.2;
            for (let i = 0; i < layerSize; i++) {
                for (let j = 0; j < layerSize; j++) {
                    if (remainingRocks <= 0) return;
                    
                    let rock = new MyRock(this.scene, Math.random() * 0.5 + 0.2, 16, 8);

                    // Calculate position
                    let posX = (i - layerSize / 2) * 0.6 + (Math.random() - 0.5) * 0.2;
                    let posY = layerHeight;
                    let posZ = (j - layerSize / 2) * 0.6 + (Math.random() - 0.5) * 0.2;

                    let scaleX = Math.random() * 0.5 + 0.5;
                    let scaleY = Math.random() * 0.5 + 0.5;
                    let scaleZ = Math.random() * 0.5 + 0.5;
                    let rotation = Math.random() * Math.PI * 2;

                    this.rocks.push({rock, posX, posY, posZ, scaleX, scaleY, scaleZ, rotation});
                    remainingRocks--;
                }
            }
        }
        remainingRocks = Math.round(10 * Math.random()) + 5;
        for (let i = 0; i < remainingRocks; i++) {
            let rock = new MyRock(this.scene, Math.random() * 0.5 + 0.2, 16, 8);

            let posX = Math.random() * 30 - 15;
            let posY = 0;
            let posZ = Math.random() * 30 - 15;

            let scaleX = Math.random() + 0.5;
            let scaleY = Math.random() + 0.5;
            let scaleZ = Math.random() + 0.5;
            let rotation = Math.random() * Math.PI * 2;

            this.rocks.push({rock, posX, posY, posZ, scaleX, scaleY, scaleZ, rotation});
        }
    }
    display() {
        for (let rockData of this.rocks) {
            this.scene.pushMatrix();
            this.scene.translate(rockData.posX, rockData.posY, rockData.posZ);
            this.scene.rotate(rockData.rotation, 0, 1, 0);
            this.scene.scale(rockData.scaleX, rockData.scaleY, rockData.scaleZ);
            this.rockAppearance.apply();
            rockData.rock.display();
            this.scene.popMatrix();
        }
    }
    enableNormalViz() {
        for (let rockData of this.rocks) {
            rockData.rock.enableNormalViz();
        }
    }
    disableNormalViz() {
        for (let rockData of this.rocks) {
            rockData.rock.disableNormalViz();
        }
    }
}
