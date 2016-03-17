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
    }
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

    OTR.loader
    .add(OTR.assets.graphic.urls.backgrounds.bg1)
    .load(OTR.commonMethods.setup);
  },
  setup: function(){
    OTR.props.bg.bg1 = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.backgrounds.bg1].texture
    );
    OTR.props.bg.bg1.position.x = 0;
    OTR.props.bg.bg1.position.y = 0;
    OTR.props.bg.bg1.width = 1024;
    OTR.props.bg.bg1.height = 768;

    OTR.stage.addChild(OTR.props.bg.bg1);

    requestAnimationFrame(OTR.commonMethods.update);
  },
  update: function(){

    OTR.renderer.render(OTR.stage);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};

OTR.characters = {
  player: {},
  enemies: []
};

OTR.assets = {
  audio: [],
  graphic:{
    urls: {
      backgrounds: {
        bg1:"resources/example-trump-bg.jpg",
        bg2:""
      }
    }
  }
};
