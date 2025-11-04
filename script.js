var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dir, score, snake, food;
var speed = 222;
var speedSnake = 20;

document.addEventListener("keydown", function(e) {
  var keyCode = e.keyCode;
  if (keyCode == 37 && dir != "right") {
    dir = "left";
  }
  if (keyCode == 38 && dir != "down") {
    dir = "up";
  }
  if (keyCode == 39 && dir != "left") {
    dir = "right";
  }
  if (keyCode == 40 && dir != "up") {
    dir = "down";
  }
});

setInterval(draw, speed);

function init() {
  dir = "right";
  score = 0;
  snake = [{ x: 40, y: 40 }, { x: 60, y: 40 }, { x: 80, y: 40 }];
  createFood();
}

function add() {
  var lastsnake = snake[snake.length - 1];

  if (dir == "right") {
    snake.push({ x: lastsnake.x + speedSnake, y: lastsnake.y });
  }
  if (dir == "down") {
    snake.push({ x: lastsnake.x, y: lastsnake.y + speedSnake });
  }
  if (dir == "left") {
    snake.push({ x: lastsnake.x - speedSnake, y: lastsnake.y });
  }
  if (dir == "up") {
    snake.push({ x: lastsnake.x, y: lastsnake.y - speedSnake });
  }
}

function createFood() {
  food = {
    x: Math.floor(Math.random() * 25),
    y: Math.floor(Math.random() * 25)
  };
  for (var i = 0; i < snake.length; i++) {
    var snake2 = snake[i];
    if (food.x == snake2.x && food.y == snake2.y) {
      createFood();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, 888, 555);
  snake.shift();
  add();

  var lastsnake = snake[snake.length - 1];
  
  if (lastsnake.x == food.x * 20 && lastsnake.y == food.y * 20) {
    score += 5;
    add();
    createFood();
  }

  for (i = 0; i < snake.length; i++) {
    snake2 = snake[i];
    if (i == snake.length - 1) {
      ctx.fillStyle = "#83a41a";
    } else {
      ctx.fillStyle = "#b4ce3a";
    }
    if (snake2.x > 640) {
      snake2.x = 0;
    }
    if (snake2.x < 0) {
      snake2.x = 640;
    }
    if (snake2.y > 480) {
      snake2.y = 0;
    }
    if (snake2.y < 0) {
      snake2.y = 480;
    }

    if (
      snake2.x == lastsnake.x &&
      snake2.y == lastsnake.y &&
      i < snake.length - 2
    ) {
      alert("End of game, your score was: " + score);
      init();
    }

    ctx.fillRect(snake2.x, snake2.y, 19, 19);
  }
  ctx.fillRect(food.x * 17, food.y * 20, 19, 19);
  ctx.fillText("Point: " + score, 10, 20);
}

requestAnimationFrame(init);