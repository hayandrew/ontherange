var OTR = OTR || {};

OTR = {
  canvasName: "game-canvas",
  jCanvas: {},
  canvasSize: {
    width: 0,
    height: 0
  },
  Container: PIXI.Container,
  TextureCache: PIXI.utils.TextureCache,
  autoDetectRenderer: PIXI.autoDetectRenderer,
  loader: PIXI.loader,
  resources: PIXI.loader.resources,
  Sprite: PIXI.Sprite,
Texture: PIXI.Texture,
	BaseTexture: PIXI.BaseTexture,
	Rectangle: PIXI.Rectangle,
  props: {
    bg: {
    },
    actors: {
    },
    projectiles: {
    },
    vfx: {
    },
	sprites: {
	}
  },
  scene: {
    projectiles: []
  }
};
OTR.commonMethods = {
  init: function(){
    OTR.jCanvas = $('#' + OTR.canvasName);
    OTR.canvasSize.width = OTR.jCanvas.width();
    OTR.canvasSize.height = OTR.jCanvas.height();

    OTR.stage = new OTR.Container();

    OTR.renderer = OTR.autoDetectRenderer(
      OTR.canvasSize.width,
      OTR.canvasSize.height,
      {
        view: document.getElementById(OTR.canvasName)
      }
    );

    OTR.assets.init();
    OTR.controls.setup();
  },
  utils: {
    depthCompare: function(a, b) {
      if (a.z < b.z) return -1;
      if (a.z > b.z) return 1;
      return 0;
    }
  },
  createEnemy: function(){
    var enemy = {
        "faction": "",
        "contraint": 400,
        "zIndex": 0,
        "obj": null
      },
      avatar = "",
      randomValue = Math.floor((Math.random() * 10) + 1);
    if (randomValue >= 5) {
      enemy.faction = "DEMOCRATIC";
      enemy.contraint += 10 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
    } else {
      enemy.faction = "REPUBLICAN";
      enemy.contraint += 10 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
    }
    enemy.obj = new OTR.Sprite(
      OTR.resources[enemy.avatar].texture
    );
    var posY = Math.floor(Math.random() * ((OTR.stage.height - OTR.props.actors.player.height) - 200 + 1)) + 50;
    enemy.obj.x = Math.floor(Math.random()) * 1024;
    enemy.obj.y = posY;
    enemy.obj.z = posY;
    enemy.obj.vx = 0;
    enemy.obj.vy = 0;
    enemy.obj.width = 330 * 0.5;
    enemy.obj.height = 500 * 0.5;

    OTR.characters.enemies.push(enemy);
    OTR.stage.addChild(enemy.obj);
    OTR.stage.children.sort(OTR.commonMethods.utils.depthCompare);

  },

  update: function(){

    OTR.props.actors.player.x += OTR.props.actors.player.vx;

    OTR.scene.projectiles.forEach(function(projectile){
      projectile.timeToLive -= 1;
      projectile.velocity -= projectile.velocity * 0.02;
      projectile.obj.y -= projectile.velocity;

      projectile.obj.width -= projectile.obj.width/80;
      projectile.obj.height -= projectile.obj.height/80;
      if (projectile.timeToLive <= 0){
        OTR.scene.projectiles.shift();
        OTR.stage.removeChild(projectile.obj);
      }
    });

    OTR.characters.enemies.forEach(function(enemy){
      enemy.obj.x += 5;

    });

    OTR.renderer.render(OTR.stage);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};

OTR.characters = {
  player: {},
  enemies: []
};
