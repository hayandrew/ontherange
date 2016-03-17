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
  props: {
    bg: {
    },
    actors: {
    },
    projectiles: {
    },
    vfx: {
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

    OTR.renderer.render(OTR.stage);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};

OTR.characters = {
  player: {},
  enemies: []
};
