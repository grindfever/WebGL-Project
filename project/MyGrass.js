import { CGFobject } from '../lib/CGF.js';

export class MyGrass extends CGFobject {
    constructor(scene, dimension) {
        super(scene);
        this.dimension = dimension;
        this.initBuffers();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
this.scene.gl.frontFace(this.scene.gl.CCW); // Ensure counterclockwise winding order is used
    }
    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
this.scene.gl.frontFace(this.scene.gl.CCW); // Ensure counterclockwise winding order is used
        // Generate grass geometry
        const numBlades = 5000; // Adjust as needed
        const bladeWidth = 0.15; // Width of the grass blade at the base
        const bladeHeight = 1.5; // Height of the grass blade
        const fieldSize = this.dimension; // Size of the field

        for (let i = 0; i < numBlades; i++) {
            // Generate random position within the field
            const posX = Math.random() * fieldSize - fieldSize / 2;
            const posY = 0; // Grass starts at y = 0
            const posZ = Math.random() * fieldSize - fieldSize / 2;

            // Generate random orientation (rotation) for the blade
            const angle = Math.random() * Math.PI * 2;

            // Generate vertices for the blade's triangle
            const baseVertices = [
                -bladeWidth / 2, 0, 0,
                bladeWidth / 2, 0, 0,
                0, bladeHeight, 0 // Make the blade go up along y-axis
            ];

            // Apply random rotation to the vertices
            const rotatedVertices = [];
            for (let j = 0; j < baseVertices.length; j += 3) {
                const x = baseVertices[j];
                const y = baseVertices[j + 1];
                const z = baseVertices[j + 2];
                // Rotate the vertex around y-axis
                const newX = x * Math.cos(angle) - z * Math.sin(angle);
                const newZ = x * Math.sin(angle) + z * Math.cos(angle);
                rotatedVertices.push(newX, y, newZ);
            }

            // Calculate normals for the vertices (assume all normals point upwards)
            const normal = [0, 1, 0];

            // Add the vertices and normals to the arrays
            for (let j = 0; j < rotatedVertices.length; j += 3) {
                this.vertices.push(rotatedVertices[j] + posX, rotatedVertices[j + 1] + posY, rotatedVertices[j + 2] + posZ);
                this.normals.push(...normal);
            }

            // Calculate indices for the triangle
            const baseIndex = i * 3;
            this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
            this.indices.push(baseIndex+2, baseIndex + 1, baseIndex );
        }

        // Create buffers
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

    update(t) {
        // Update grass animation based on time
        // Implement wind effect to simulate movement
    }
}