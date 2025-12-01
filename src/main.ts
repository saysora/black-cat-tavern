const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas?.getContext("2d");

console.log(canvas);

interface Snow {
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
}

function makeSnow(snowArr: Snow[], tick: number, c: HTMLCanvasElement) {
  if (tick % 10 === 0) {
    if (snowArr.length < 100) {
      snowArr.push({
        x: Math.random() * c.width,
        y: 0,
        speed: 2 + Math.random() * 3,
        radius: Math.random() * 1,
        color: "white",
      });
    }
  }
}

function updateSnow(snowArr: Snow[]) {
  console.log(snowArr);
  for (const i in snowArr) {
    const snow = snowArr[i];
    snow.y += snow.speed / 4;
  }
}

function killSnow(snowArr: Snow[], c: HTMLCanvasElement) {
  for (const i in snowArr) {
    const snow = snowArr[i];
    if (snow.y > c.height) {
      snow.y = 0;
    }
  }
}

function drawSnow(snowArr: Snow[], c: HTMLCanvasElement) {
  const canvas = c.getContext("2d");
  if (!canvas) return;

  canvas.clearRect(0, 0, c.width, c.height);
  for (var i in snowArr) {
    var snow = snowArr[i];
    canvas.beginPath();
    canvas.arc(snow.x, snow.y, snow.radius, 0, Math.PI * 2);
    canvas.closePath();
    canvas.fillStyle = snow.color;
    canvas.fill();
  }
}

function loopSnow(snowArr: Snow[], canvas: HTMLCanvasElement, tick = 0) {
  window.requestAnimationFrame(() => loopSnow(snowArr, canvas, tick));
  makeSnow(snowArr, tick, canvas);
  updateSnow(snowArr);
  killSnow(snowArr, canvas);
  drawSnow(snowArr, canvas);
}

function snowMachine(c: HTMLCanvasElement) {
  const snow: Snow[] = [];
  var tick = 0;

  window.requestAnimationFrame(() => loopSnow(snow, c, tick));
}

snowMachine(canvas);
