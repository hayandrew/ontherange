OTR.assets = {
  audio: [],
  graphic:{
    urls: {
      backgrounds: {
        bg1:"resources/example-trump-bg.jpg",
        bg2:""
      },
      actors: {
        player: "resources/throwing-arm.jpg"
      },
      projectiles: {
        tomato: "resources/tomato.png"
      },
      vfx: {

      }
    }
  },
  init: function(){
    OTR.loader
    .add(OTR.assets.graphic.urls.backgrounds.bg1)
    .add(OTR.assets.graphic.urls.actors.player)
    .add(OTR.assets.graphic.urls.projectiles.tomato)
    .load(OTR.assets.setup);
  },
  setup: function(){
    OTR.props.bg.bg1 = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.backgrounds.bg1].texture
    );
    OTR.props.bg.bg1.x = 0;
    OTR.props.bg.bg1.y = 0;
    OTR.props.bg.bg1.width = 1024;
    OTR.props.bg.bg1.height = 768;

    OTR.props.actors.player = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.actors.player].texture
    );
    OTR.props.actors.player.x = 312;
    OTR.props.actors.player.y = 468;
    OTR.props.actors.player.vx = 0;
    OTR.props.actors.player.vy = 0;
    OTR.props.actors.player.width = 400;
    OTR.props.actors.player.height = 300;

    OTR.stage.addChild(OTR.props.bg.bg1);
    OTR.stage.addChild(OTR.props.actors.player);

    requestAnimationFrame(OTR.commonMethods.update);
  },
};
