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
        tomato: "resources/tomato.png",
        goldbar: "resources/weapon_gold.png",
        money: "resources/weapon_money.png",
        pump: "resources/weapon_pump.png",
        sausage: "resources/weapon_sausage.png",
        xxxTape: "resources/weapon_xxxTape.png"
      },
      vfx: {
      },
	    imgUrls: {
		    clinton: {
			    body: 'resources/sprites/clinton-walk.png',
			    normal: 'resources/heads/clinton.png',
			    hit: 'resources/heads/clinton-hit.png'
		    },
		    sanders: {
			    body: 'resources/sprites/sanders-walk.png',
			    normal: 'resources/heads/sanders.png',
			    hit: 'resources/heads/sanders-hit.png'
		    },
		    kasich: {
			    body: 'resources/sprites/kasich-walk.png',
			    normal: 'resources/heads/kasich.png',
			    hit: 'resources/heads/kasich-hit.png'
		    },
		    trump: {
			    body: 'resources/sprites/trump-walk.png',
			    normal: 'resources/heads/trump.png',
			    hit: 'resources/heads/trump-hit.png'
		    },
		    cruz: {
			    body: 'resources/sprites/cruz-walk.png',
			    normal: 'resources/heads/cruz.png',
			    hit: 'resources/heads/cruz-hit.png'
		    },
		    noah: {
			    body: 'resources/sprites/noah-walk.png',
			    normal: 'resources/heads/noah.png',
			    hit: 'resources/heads/noah-hit.png'
		    }
	    }
    }
  },
  init: function(){
    OTR.loader
    .add(OTR.assets.graphic.urls.backgrounds.bg1)
    .add(OTR.assets.graphic.urls.actors.player)
    .add(OTR.assets.graphic.urls.projectiles.tomato)
    .add(OTR.assets.graphic.urls.projectiles.goldbar)
    .add(OTR.assets.graphic.urls.projectiles.money)
    .add(OTR.assets.graphic.urls.projectiles.pump)
    .add(OTR.assets.graphic.urls.projectiles.sausage)
    .add(OTR.assets.graphic.urls.projectiles.xxxTape)
	    .add(OTR.assets.graphic.urls.imgUrls.clinton.body)
	    .add(OTR.assets.graphic.urls.imgUrls.sanders.body)
	    .add(OTR.assets.graphic.urls.imgUrls.kasich.body)
	    .add(OTR.assets.graphic.urls.imgUrls.noah.body)
	    .add(OTR.assets.graphic.urls.imgUrls.cruz.body)
	    .add(OTR.assets.graphic.urls.imgUrls.trump.body)

	    .add(OTR.assets.graphic.urls.imgUrls.clinton.normal)
	    .add(OTR.assets.graphic.urls.imgUrls.sanders.normal)
	    .add(OTR.assets.graphic.urls.imgUrls.kasich.normal)
	    .add(OTR.assets.graphic.urls.imgUrls.noah.normal)
	    .add(OTR.assets.graphic.urls.imgUrls.cruz.normal)
	    .add(OTR.assets.graphic.urls.imgUrls.trump.normal)

	    .add(OTR.assets.graphic.urls.imgUrls.clinton.hit)
	    .add(OTR.assets.graphic.urls.imgUrls.sanders.hit)
	    .add(OTR.assets.graphic.urls.imgUrls.kasich.hit)
	    .add(OTR.assets.graphic.urls.imgUrls.noah.hit)
	    .add(OTR.assets.graphic.urls.imgUrls.cruz.hit)
	    .add(OTR.assets.graphic.urls.imgUrls.trump.hit)

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

    OTR.stage.addChild(OTR.props.bg.bg1);
    OTR.stage.addChild(OTR.props.actors.player);
	OTR.stage.addChild(OTR.props.actors.player);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};
