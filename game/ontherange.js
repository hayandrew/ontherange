var OTR = OTR || {};

OTR = {
  canvasName: "game-canvas",
  jCanvas: {},
  canvasSize: {
    width: 0,
    height: 0
  },
  gameProps: {
    bg: {
      bg1:{},
      bg2: {}
    }
  }
};
OTR.commonMethods = {
  init: function(){
    OTR.jCanvas = $('#' + OTR.canvasName);
    OTR.canvasSize.width = OTR.jCanvas.width();
    OTR.canvasSize.height = OTR.jCanvas.height();

    OTR.stage = new PIXI.Container(0x66FF99);

    OTR.renderer = PIXI.autoDetectRenderer(
      OTR.canvasSize.width,
      OTR.canvasSize.height,
      {
        view: document.getElementById(OTR.canvasName)
      }
    );

    OTR.assets.graphic.refs.backgrounds.bg1 = PIXI.Texture.fromImage(OTR.assets.graphic.urls.backgrounds.bg1);
    OTR.gameProps.bg.bg1 = new PIXI.Sprite(OTR.assets.graphic.refs.backgrounds.bg1);
    OTR.gameProps.bg.bg1.position.x = 0;
    OTR.gameProps.bg.bg1.position.y = 0;
    OTR.gameProps.bg.bg1.width = 1024;
    OTR.gameProps.bg.bg1.height = 768;
    OTR.stage.addChild(OTR.gameProps.bg.bg1);

    requestAnimationFrame(OTR.commonMethods.update);
    //OTR.renderer.render(OTR.stage);
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
    },
    refs: {
      backgrounds: {

      }
    }
  }
};
