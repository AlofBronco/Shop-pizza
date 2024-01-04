import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom({
  background: [245, 222, 179],
});

// Sprites

loadSprite("pizza-main", "/pizza-main.png");

scene("game", () => {
  // define gravity
  setGravity(2400);

  // add a game object to screen
  const player = add([
    // list of components
    sprite("pizza-main"),
    pos(80, 40),
    area(),
    body(),
    scale(6),
  ]);

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(5),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(rgb(244, 164, 96)),
  ]);

  function jump() {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
    }
  }

  // jump when user press space
  onKeyPress("space", jump);
  onClick(jump);

  onKeyPress("r", () => {
    go("lose", score);
    burp();
    addKaboom(player.pos);

    scene("lose", (score) => {
      add([sprite("pizza-main"), pos(width() / 2, height() / 2 - 64), scale(8), anchor("center")]);

      // display score
      add([text(score), pos(width() / 2, height() / 2 + 64), scale(2), anchor("center")]);

      // go back to game with space is pressed
      onKeyPress("space", () => go("game"));
      onClick(() => go("game"));
    });
  });

  function spawnTree() {
    // add tree obj
    const tree = add([
      rect(48, rand(32, 96)),
      area(),
      outline(5),
      pos(width(), height() - FLOOR_HEIGHT),
      anchor("botleft"),
      color(rgb(255, 99, 71)),
      move(LEFT, SPEED),
      offscreen({ destroy: true }),
      "tree",
    ]);

    // wait a random amount of time to spawn next tree
    wait(rand(0.7, 1.5), spawnTree);
  }

  // start spawning trees
  spawnTree();

  onKeyPress("q", () => {
    onUpdate(() => {
      const t = time() * 10;
      player.color = rgb(wave(0, 255, t), wave(0, 255, t + 2), wave(0, 255, t + 4));
    });
  });

  // lose if player collides with any game obj with tag "tree"
  player.onCollide("tree", () => {
    // go to "lose" scene and pass the score
    go("lose", score);
    burp();
    addKaboom(player.pos);
  });

  // keep track of score
  let score = 0;

  const scoreLabel = add([text(score), pos(24, 24)]);
  const instrLabel = add([text("press r to restart"), pos(1154, 24)]);

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

scene("lose", (score) => {
  add([sprite("pizza-main"), pos(width() / 2, height() / 2 - 64), scale(8), anchor("center")]);

  // display score
  add([text(score), pos(width() / 2, height() / 2 + 64), scale(2), anchor("center")]);

  // go back to game with space is pressed
  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});

go("game");
