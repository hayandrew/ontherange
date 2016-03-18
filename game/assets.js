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
	  sprites: {
		man1: 'resources/sprites/clinton-walk.png'
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
	.add(OTR.assets.graphic.urls.sprites.man1)
    .load(OTR.assets.setup);
  },
  setup: function(loader, res){
    OTR.props.bg.bg1 = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.backgrounds.bg1].texture
    );
    OTR.props.bg.bg1.x = 0;
    OTR.props.bg.bg1.y = 0;
    OTR.props.bg.bg1.z = 1;
    OTR.props.bg.bg1.width = 1024;
    OTR.props.bg.bg1.height = 768;

    OTR.props.actors.player = new OTR.Sprite(
      OTR.resources[OTR.assets.graphic.urls.actors.player].texture
    );
    OTR.props.actors.player.x = 312;
    OTR.props.actors.player.y = 468;
    OTR.props.actors.player.z = 1000;
    OTR.props.actors.player.vx = 0;
    OTR.props.actors.player.vy = 0;
    OTR.props.actors.player.width = 400;
    OTR.props.actors.player.height = 300;

	OTR.props.sprites.man1 = new OTR.Sprite(
		OTR.resources[OTR.assets.graphic.urls.sprites.man1].texture
	);

	var man1 = OTR.props.sprites.man1;

	  man1.x = 200;
	  man1.y = 150;
	  man1.width = 2640;
	  man1.height = 500;

	for(var i = 0; i < 8; i++){
		var frame = new OTR.Texture(OTR.BaseTexture.fromImage('resources/sprites/clinton-walk.png'));
		frame.setFrame(new OTR.Rectangle( (i *330), 0, 330, 500));
		if(i === 0){
			man1 = new OTR.Sprite(frame);
			man1.animation = {};
			man1.animation.frameNumber = 8;
			man1.animation.frames = [];
			man1.animation.frameCounter = 0;
		};
		man1.animation.frames.push(frame);
	};
	man1.animation.looper = setInterval(function(){
		  man1.setTexture(man1.animation.frames[man1.animation.frameCounter]);
		  man1.animation.frameCounter++;
		  if(man1.animation.frameCounter === man1.animation.frames.length){
			  man1.animation.frameCounter = 0;
		  };
	  }, 100);

    OTR.stage.addChild(OTR.props.bg.bg1);
    OTR.stage.addChild(OTR.props.actors.player);
	OTR.stage.addChild(OTR.props.actors.player);
	OTR.stage.addChild(man1);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};