OTR.controls = {
  keyboard: function(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  },
  setup: function(){
    OTR.keyLeft = OTR.controls.keyboard(37);
    OTR.keyRight = OTR.controls.keyboard(39);
    OTR.keyFire = OTR.controls.keyboard(32);

    OTR.keyLeft.press = function(){
      OTR.props.actors.player.vx = -5;
    };
    OTR.keyLeft.release = function(){
      if (!OTR.keyRight.isDown) {
        OTR.props.actors.player.vx = 0;
      }
    };
    OTR.keyRight.press = function(){
      OTR.props.actors.player.vx = 5;
    };
    OTR.keyRight.release = function(){
      if (!OTR.keyLeft.isDown) {
        OTR.props.actors.player.vx = 0;
      }
    };
    OTR.keyFire.press = function(){
      if (OTR.bulletDelay >= 60){
        OTR.bulletDelay = 0;
        OTR.controls.fireProjectile();
      }
    };
    OTR.keyFire.release = function(){

    };
  },
  fireProjectile: function(){

    OTR.props.sounds.throw.play();

    var projectile = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.projectiles.tomato].texture
    );
    projectile.width = 80;
    projectile.height = 80;
    projectile.x = OTR.props.actors.player.x + OTR.props.actors.player.x/2;
    projectile.y = OTR.props.actors.player.y;
    projectile.z = 999;

    OTR.stage.addChild(projectile);

    OTR.scene.projectiles.push({
      "id": ++OTR.bulletCounter,
      "active": false,
      "timeToLive": 120,
      "distance": 0,
      "velocity": 6.5,
      obj: projectile
    });
  }
};
