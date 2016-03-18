var OTR = OTR || {};

OTR = {
  canvasName: "game-canvas",
  jCanvas: {},
  canvasSize: {
    width: 0,
    height: 0
  },
  enemyTimer: 0,
  enemyCounter: 0,
  bulletDelay: 0,
  bulletCounter: 0,
  enemyBulletCounter: 0,
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
	},
	  sounds: {
		  throw: new Audio("resources/audio/swipe.ogg"),
		  bernie: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/bernie-sanders-shot-hit-it-doesnt-matter.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/bernie-sanders-shot-hit-we-are-going-to-get-our-way-no-matter-what.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/bernie-sanders-shot-miss-enough-with-the-hellos-lets-do-this.ogg")
			  }
		  ],
		  donald: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/donald-trump-shot-hit-son-of-a-bitch.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/donald-trump-shot-miss-he-s-terrible.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/donald-trump-shot-miss-i-yiii-yiii.ogg")
			  },
			  {
				  id:3,
				  sound: new Audio("resources/audio/donald-trump-the-hell-outta-here-will-you-please.ogg")
			  },
			  {
				  id:4,
				  sound: new Audio("resources/audio/donald-trump-what-kind-of-people-do-i-have-here.ogg")
			  }
		  ],
		  hillary: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/hillary-clinton-shot-hit-you-re-not-patriotic.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/hillary-clinton-shot-miss-laughing.ogg")
			  }
		  ],
		  john: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/john-kasich-shot-hit-i-will-be-a-winner-regardless-of-what-happens.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/john-kasich-shot-miss-come-on-folks.ogg")
			  }
		  ],
		  ted: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/ted-cruz-shot-hit-the-world-is-on-fire-YES.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/ted-cruz-shot-miss-it-is-now-or-never.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/ted-cruz-shot-miss-it-s-great-to-be-with-you.ogg")
			  }
		  ],
		  trevor: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/trevor-noah-wow-wow.ogg")
			  }
		  ]
	  }
  },
  scene: {
    player: {
      "life": 3
    },
    projectiles: [],
    enemyProjectiles: []
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
    showGameOver: function() {
      alert("Game Over");
    },
    depthCompare: function(a, b) {
      if (a.z < b.z) return -1;
      if (a.z > b.z) return 1;
      return 0;
    },
    hitTestRectangle: function(r1, r2) {

      //Define the variables we'll need to calculate
      var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

      //hit will determine whether there's a collision
      hit = false;

      //Find the center points of each sprite
      r1.centerX = r1.x + r1.width / 2;
      r1.centerY = r1.y + r1.height / 2;
      r2.centerX = r2.x + r2.width / 2;
      r2.centerY = r2.y + r2.height / 2;

      //Find the half-widths and half-heights of each sprite
      r1.halfWidth = r1.width / 2;
      r1.halfHeight = r1.height / 2;
      r2.halfWidth = r2.width / 2;
      r2.halfHeight = r2.height / 2;

      //Calculate the distance vector between the sprites
      vx = r1.centerX - r2.centerX;
      vy = r1.centerY - r2.centerY;

      //Figure out the combined half-widths and half-heights
      combinedHalfWidths = r1.halfWidth + r2.halfWidth;
      combinedHalfHeights = r1.halfHeight + r2.halfHeight;

      //Check for a collision on the x axis
      if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

          //There's definitely a collision happening
          hit = true;
        } else {

          //There's no collision on the y axis
          hit = false;
        }
      } else {

        //There's no collision on the x axis
        hit = false;
      }

      //`hit` will be either `true` or `false`
      return hit;
    }
  },
  createEnemy: function(){
    var enemy = {
        "id": ++OTR.enemyCounter,
        "faction": "",
        "constraint": 600,
        "zIndex": 0,
        "initialX": 0,
        "turnaround": false,
        "obj": null
      },
      avatar = "",
      plusOrMinus = Math.random() < 0.5 ? -1 : 1,
      randomValue = Math.floor((Math.random() * 10) + 1);
    if (randomValue >= 8.5) {
      enemy.person = "hillary";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.hillary[0];
      enemy.sounds = OTR.props.sounds.hillary;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.pump;
    } else if (randomValue >= 7) {
      enemy.person = "donald";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.donald[0];
      enemy.sounds = OTR.props.sounds.donald;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.goldbar;
    } else if (randomValue >= 4.5) {
      enemy.person = "bernie";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.bernie[0];
      enemy.sounds = OTR.props.sounds.bernie;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.money;
    }else if (randomValue >= 3) {
      enemy.person = "john";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.john[0];
      enemy.sounds = OTR.props.sounds.john;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.sausage;
    }else if (randomValue >= 1.5) {
      enemy.person = "ted";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.ted[0];
      enemy.sounds = OTR.props.sounds.ted;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.xxxTape;
    }else {
      enemy.person = "trevor";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.trevor[0];
      enemy.sounds = OTR.props.sounds.trevor;
      enemy.weapon = null;
    }
    enemy.contraint += plusOrMinus * 100;
    enemy.fireDelay = 0;
    enemy.fireRate = 200 + (plusOrMinus * 10);
    enemy.obj = new OTR.Sprite(
      OTR.resources[enemy.avatar].texture
    );
    var posY = Math.floor(Math.random() * 100) + 100;
    enemy.obj.width = 330 * 0.5;
    enemy.obj.height = 500 * 0.5;
    enemy.obj.x = Math.round(Math.random()) * (OTR.canvasSize.width - enemy.obj.width);
    enemy.initialX = enemy.obj.x;
    enemy.obj.y = posY;
    enemy.obj.z = posY;
    enemy.obj.vx = 0;
    enemy.obj.vy = 0;

    OTR.characters.enemies.push(enemy);
    OTR.stage.addChild(enemy.obj);
    OTR.stage.children.sort(OTR.commonMethods.utils.depthCompare);

  },

  initEnemies: function(){
    if (OTR.enemyTimer % 180 === 0 && OTR.characters.enemies.length < 6){
      OTR.commonMethods.createEnemy();
    }
  },

  update: function(){
    if (OTR.scene.player.life <= 0){
      OTR.commonMethods.utils.showGameOver();
      return false;
    }

    OTR.enemyTimer++;
    OTR.bulletDelay++;
    OTR.commonMethods.initEnemies();

    OTR.props.actors.player.x += OTR.props.actors.player.vx;

    OTR.scene.projectiles.forEach(function(projectile){
      var bulletHit = false;

      projectile.timeToLive -= 1;
      projectile.velocity -= projectile.velocity * 0.02;
      projectile.obj.y -= projectile.velocity;

      projectile.obj.width -= projectile.obj.width/80;
      projectile.obj.height -= projectile.obj.height/80;

      if (projectile.timeToLive <= 50){
        projectile.active = true;
      }
      if (projectile.active){
        OTR.characters.enemies.forEach(function(enemy){
          if (OTR.commonMethods.utils.hitTestRectangle(projectile.obj, enemy.obj)){
            // HIT, remove bullet and enemy
            console.log("HIT")
            enemy.hitsound.sound.play();
            OTR.characters.enemies = $.grep(OTR.characters.enemies, function(e){
              return e.id != enemy.id;
            });
            OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
              return e.id != projectile.id;
            });
            OTR.stage.removeChild(enemy.obj);
            OTR.stage.removeChild(projectile.obj);
            bulletHit = true;
          }
        });
      }

      if (projectile.timeToLive <= 0 && !bulletHit){
        OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);
      }
    });

    OTR.scene.enemyProjectiles.forEach(function(projectile){

      projectile.timeToLive -= 1;
      projectile.velocity += projectile.velocity * 0.001;
      projectile.obj.y += projectile.velocity;

      projectile.obj.width += projectile.obj.width/40;
      projectile.obj.height += projectile.obj.height/40;

      if (OTR.commonMethods.utils.hitTestRectangle(projectile.obj, OTR.props.actors.player)){
        // HIT, remove bullet and enemy
        console.log("PLAYER HIT");
        //enemy.hitsound.sound.play();
        OTR.scene.player.life--;
        OTR.scene.enemyProjectiles = $.grep(OTR.scene.enemyProjectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);

      }
/*
      if (projectile.active){
        OTR.characters.enemies.forEach(function(enemy){
          if (OTR.commonMethods.utils.hitTestRectangle(projectile.obj, enemy.obj)){
            // HIT, remove bullet and enemy
            console.log("HIT")
            enemy.hitsound.sound.play();
            OTR.characters.enemies = $.grep(OTR.characters.enemies, function(e){
              return e.id != enemy.id;
            });
            OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
              return e.id != projectile.id;
            });
            OTR.stage.removeChild(enemy.obj);
            OTR.stage.removeChild(projectile.obj);
            bulletHit = true;
          }
        });
      }
*/
      if (projectile.timeToLive <= 0){
        OTR.scene.enemyProjectiles = $.grep(OTR.scene.enemyProjectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);
      }
    });

    OTR.characters.enemies.forEach(function(enemy){

      if (enemy.weapon){
        enemy.fireDelay++;
        if (enemy.fireDelay >= enemy.fireRate){
          OTR.controls.enemyFireProjectile(enemy);
          enemy.fireDelay = 0;
        }
      }

      if (enemy.initialX > 0 && !enemy.turnaround){
        enemy.obj.x -= 5;
      } else if (!enemy.turnaround) {
        enemy.obj.x += 5;
      }
      if (enemy.initialX > 0 && enemy.turnaround){
        enemy.obj.x += 5;
      } else if (enemy.turnaround) {
        enemy.obj.x -= 5;
      }
      if (enemy.initialX > 0){
        if (enemy.obj.x <= enemy.initialX - enemy.constraint) {
          enemy.turnaround = true;
        } else if (enemy.obj.x >= enemy.initialX) {
          enemy.turnaround = false;
        }
      } else {
        if (enemy.obj.x >= enemy.initialX + enemy.constraint) {
          enemy.turnaround = true;
        } else if (enemy.obj.x <= enemy.initialX) {
          enemy.turnaround = false;
        }
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
