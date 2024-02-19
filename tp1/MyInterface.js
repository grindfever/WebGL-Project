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
        
        // TP1 - Ex 1 - Part 2
        this.gui.add(this.scene, 'visibilityTriangle').name('Visibility Triangle');
        this.gui.add(this.scene, 'visibilityDiamond').name('Visibility Diamond');

        // TP1 - Ex 1 - Part 4
        this.gui.add(this.scene, 'visibilityParallelogram').name('Visibility Parallelogram');

        // Adjust the size of the controls interface
        this.gui.width = 300;

        return true;
    }
}