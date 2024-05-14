import { CGFobject, CGFappearance } from "../lib/CGF.js";
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
        this.scene = scene; // Correctly set the scene reference
        this.numRocks = numRocks;
        this.rocks = [];
        this.initRocks();
        this.initAppearance();
    }

    initAppearance() {
        // Rock appearance
        this.rockAppearance = new CGFappearance(this.scene); // Pass the scene correctly
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.rockAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.rockAppearance.setShininess(10.0);
    }

    initRocks() {
        const layers =12; // Calculate number of layers based on total rocks
        let rockCount = 0; // Counter to keep track of rocks placed
    
        for (let layer = 0; layer < layers; layer++) {
            const layerSize = layers - layer; // Number of rocks per side in this layer
            const layerHeight = layer * 0.5; // Vertical position of the current layer
    
            for (let i = 0; i < layerSize; i++) {
                for (let j = 0; j < layerSize; j++) {
                    if (rockCount >= this.numRocks) return; // Stop if we've placed all rocks
    
                    let radius = Math.random() * 0.5 + 0.2; // Random radius between 0.2 and 0.7
                    let slices = 16; // Fixed number of slices
                    let stacks = 8; // Fixed number of stacks
                    let rock = new MyRock(this.scene, radius, slices, stacks);
    
                    // Calculate position
                    let posX = (i - layerSize / 2) * 1.2 + (Math.random() - 0.5) * 0.2;
                    let posY = layerHeight;
                    let posZ = (j - layerSize / 2) * 1.2 + (Math.random() - 0.5) * 0.2;
    
                    let scaleX = Math.random() * 0.5 + 0.5; // Random scale factor between 0.5 and 1.0
                    let scaleY = Math.random() * 0.5 + 0.5; // Random scale factor between 0.5 and 1.0
                    let scaleZ = Math.random() * 0.5 + 0.5; // Random scale factor between 0.5 and 1.0
                    let rotation = Math.random() * Math.PI * 2; // Random rotation angle between 0 and 2π
    
                    this.rocks.push({ rock, posX, posY, posZ, scaleX, scaleY, scaleZ, rotation });
                    rockCount++;
                }
            }
        }
    }
    
    
    

    display() {
        for (let rockData of this.rocks) {
            this.scene.pushMatrix();
            this.scene.translate(rockData.posX, rockData.posY, rockData.posZ);
            this.scene.rotate(rockData.rotation, 0, 1, 0);
            this.scene.scale(rockData.scaleX, rockData.scaleY, rockData.scaleZ);
            this.rockAppearance.apply(); // Apply the appearance here
            rockData.rock.display();
            this.scene.popMatrix();
        }
    }
}
