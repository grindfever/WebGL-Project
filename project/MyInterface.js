import { CGFinterface, dat } from '../lib/CGF.js';
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

        //Checkbox elements in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name('Display Normals');
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayRockSet').name('Display RockSet');
        

        //Slider elemente in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'fov', 0.1, 2).name('Field of View');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        
        this.initKeys();

        return true;
    }
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
