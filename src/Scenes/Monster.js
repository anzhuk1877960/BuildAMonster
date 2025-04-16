class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.leftLeg = this.add.sprite(this.bodyX + 50, this.bodyY + 125, "monsterParts", "leg_redA.png");
        my.sprite.rightLeg = this.add.sprite(this.bodyX - 50, this.bodyY + 125, "monsterParts", "leg_redA.png");
        my.sprite.rightLeg.flipX = true;

        my.sprite.leftArm = this.add.sprite(this.bodyX + 100, this.bodyY + 100, "monsterParts", "arm_redD.png");
        my.sprite.rightArm = this.add.sprite(this.bodyX - 100, this.bodyY + 100, "monsterParts", "arm_redD.png");
        my.sprite.rightArm.flipX = true;
        
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redD.png");
        
        my.sprite.smilingMouth = this.add.sprite(this.bodyX, this.bodyY + 50, "monsterParts", "mouthC.png");
        my.sprite.angryMouth = this.add.sprite(this.bodyX, this.bodyY + 50, "monsterParts", "mouthJ.png");
        my.sprite.nose = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "nose_brown.png");
        
        my.sprite.leftEye = this.add.sprite(this.bodyX + 50, this.bodyY - 50, "monsterParts", "eye_human_red.png");
        my.sprite.rightEye = this.add.sprite(this.bodyX - 50, this.bodyY - 50, "monsterParts", "eye_human_red.png");
        
        my.sprite.leftAntenna = this.add.sprite(this.bodyX + 25, this.bodyY - 100, "monsterParts", "detail_red_antenna_small.png");
        my.sprite.rightAntenna = this.add.sprite(this.bodyX - 25, this.bodyY - 100, "monsterParts", "detail_red_antenna_small.png");
        my.sprite.rightAntenna.flipX = true;

        this.currExpression = "smile";

        my.sprite.angryMouth.visible = false;

        this.keys = this.input.keyboard.addKeys({
            smile: "S",
            fangs: "F",
            left: "A",
            right: "D"
        });
        
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if (Phaser.Input.Keyboard.JustDown(this.keys.smile)) {
            my.sprite.angryMouth.visible = false;
            my.sprite.smilingMouth.visible = true;
            this.currExpression = "smile";
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.fangs)) {
            my.sprite.smilingMouth.visible = false;
            my.sprite.angryMouth.visible = true;
            this.currExpression = "fangs";
        }
        
        if (this.keys.left.isDown) {
            for (let part in my.sprite)
                my.sprite[part].x -= 1;
        } else if (this.keys.right.isDown) {
            for (let part in my.sprite)
                my.sprite[part].x += 1;
        }
    }

}