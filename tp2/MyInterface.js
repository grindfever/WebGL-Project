import {CGFinterface, dat} from '../lib/CGF.js';
/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }
    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        // TP2 - Tangram
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');

        // TP2 - UnitCube
        this.gui.add(this.scene, 'displayUnitCube').name('Display Unit Cube');

        // TP2 - UnitCubeQuad
        this.gui.add(this.scene, 'displayUnitCubeQuad').name('Display Unit Cube Quad');

        this.gui.width = 400;

        return true;
    }
}
