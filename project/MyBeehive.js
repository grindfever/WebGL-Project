import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
/**
 * MyBeehive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBeehive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.pollens = [];
        this.initBuffers(scene);
    }
    initBuffers(scene) {
        this.pollenAppearance = new CGFappearance(scene);
        this.pollenAppearance.setTexture(new CGFtexture(scene, 'images/pollen.png'));
        this.pollenAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenAppearance.setShininess(10.0);

        // Define vertices
        this.vertices = [
            // Bottom vertex
            -1, 0, -1, // 0
             1, 0, -1,  // 1
             1, 0, 1,   // 2
            -1, 0, 1,  // 3
    
          // Top vertex
            -1, 1, -1, // 4
             1, 1, -1,  // 5
             1, 1, 1,   //6
            -1, 1, 1,  // 7
        ];

        // Add vertices for internal boards (front and back faces)
        const numBoards = 5;  // Number of internal boards
        const boardSpacing = 2 / (numBoards + 1);  // Calculate spacing between boards
        const boardThickness = 0.05;  // Thickness of the boards

        for (let i = 1; i <= numBoards; i++) {
            let x = -1 + i * boardSpacing;
            this.vertices.push(
                // Front face
                x - boardThickness / 2, 0, -1,  // Bottom vertex of front face
                x - boardThickness / 2, 1, -1,  // Top vertex of front face
                x + boardThickness / 2, 0, -1,  // Bottom vertex of front face
                x + boardThickness / 2, 1, -1,  // Top vertex of front face

                // Back face
                x - boardThickness / 2, 0,  1,  // Bottom vertex of back face
                x - boardThickness / 2, 1,  1,  // Top vertex of back face
                x + boardThickness / 2, 0,  1,  // Bottom vertex of back face
                x + boardThickness / 2, 1,  1   // Top vertex of back face
            );
        }

        // Define indices
        this.indices = [
            // Bottom face
            0, 1, 2,
            2,1,0,
            0, 2, 3,
            3,2,0,
            // Side faces
            0,1,4, 4,1,0,
            1,5,4, 4,5,1,
            1,2,5, 5,2,1,
            2,6,5, 5,6,2,
            3,2,7, 7,2,3,
            2,6,7, 7,6,2,
            0,3,4, 4,3,0,
            3,7,4, 4,7,3,
    
            // Front face
            2, 6, 7,
            2, 7, 3,
        ];
        // Add indices for internal boards
        for (let i = 0; i < numBoards; i++) {
            let baseIndex = 8 + i * 8;
            // Front face
            this.indices.push(
                baseIndex, baseIndex + 1, baseIndex + 3,
                baseIndex, baseIndex + 3, baseIndex + 2,
                // Reverse front face
                baseIndex + 3, baseIndex + 1, baseIndex,
                baseIndex + 2, baseIndex + 3, baseIndex
            );
            // Back face
            this.indices.push(
                baseIndex + 4, baseIndex + 5, baseIndex + 7,
                baseIndex + 4, baseIndex + 7, baseIndex + 6,
                // Reverse back face
                baseIndex + 7, baseIndex + 5, baseIndex + 4,
                baseIndex + 6, baseIndex + 7, baseIndex + 4
            );
            // Sides
            this.indices.push(
                baseIndex, baseIndex + 1, baseIndex + 5,
                baseIndex, baseIndex + 5, baseIndex + 4,
                baseIndex + 2, baseIndex + 3, baseIndex + 7,
                baseIndex + 2, baseIndex + 7, baseIndex + 6
            );
        }

        // Define indices for the top connecting piece
        for (let i = 0; i < numBoards - 1; i++) {
            let baseIndex = 8 + i * 8 + 1;
            this.indices.push(
                baseIndex, baseIndex + 8, baseIndex + 9,
                baseIndex, baseIndex + 9, baseIndex + 1
            );
        }
   
        // Calculate normals
        this.normals = [
            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
    
            // Top face
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
    
            // Side faces
            -1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
        ];

        // Add normals for internal boards
        for (let i = 0; i < numBoards; i++) {
            this.normals.push(
                // Front face
                0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,
                // Back face
                0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
                // Sides
                -1, 0, 0,  -1, 0, 0,  1, 0, 0,  1, 0, 0,
                -1, 0, 0,  -1, 0, 0,  1, 0, 0,  1, 0, 0
            );
        }

        this.texCoords = [
            // Bottom face
            0, 0,
            1, 0,
            1, 1,
            0, 1,
        
            // Top face
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            
            // Side faces
            0, 0,  1, 0,  1, 1,  0, 1,
            0, 0,  1, 0,  1, 1,  0, 1,
            0, 0,  1, 0,  1, 1,  0, 1,
            0, 0,  1, 0,  1, 1,  0, 1,
        ];

        // Add texture coordinates for internal boards (eye texture)
        for (let i = 0; i < numBoards; i++) {
            this.texCoords.push(
                // Front face
                0, 0,  1, 0,  1, 1,  0, 1,
                // Back face
                0, 0,  1, 0,  1, 1,  0, 1,
                // Sides
                0, 0,  1, 0,  1, 1,  0, 1,
                0, 0,  1, 0,  1, 1,  0, 1
            );
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    addPollen(pollen) {
        this.pollens.push(pollen);
    }
    display() {
        super.display();
        if (this.pollens) {
            this.pollenAppearance.apply();
            let pollensPerRow = 6;
            let maxPollensPerLayer = 24;
            for (let i = 0; i < this.pollens.length; i++) {
                let layer = Math.floor(i / maxPollensPerLayer);
                let row = Math.floor((i % maxPollensPerLayer) / pollensPerRow);
                let col = i % pollensPerRow;
                this.scene.pushMatrix();
                this.scene.translate(-0.9 + col * 0.35, 0.1 + layer * 0.3, -0.7 + row * 0.5);
                this.scene.scale(0.2, 0.2, 0.2);
                this.pollens[i].display();
                this.scene.popMatrix();
            }
        }
    }
}
