const canvas = document.getElementById("can");
const c = canvas.getContext("2d");
const c2 = canvas.getContext("2d");
var H = (canvas.height = window.innerHeight / 1.3);
var W = (canvas.width = window.innerWidth / 2);
window.addEventListener("resize", () => {
  canvas.heigth = window.innerHeight / 2;
  canvas.width = window.innerWidth / 2;
});
const row = 4;
const col = 4;
const imgPx = new imgPixels(W, H, row, col);
const img = new Image();
img.src = "./1.jpg";
var imageData = [];
let arr = [];
var k = 0;
var Y, X;
var angle = 0;
img.addEventListener("load", () => {
  c.drawImage(img, 0, 0, W, H);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // to push random index of i and j in arr... this is to make random position order like a puzzle
      if (arr.length == 0) {
        X = Math.floor(0 + Math.random() * row);
        Y = Math.floor(0 + Math.random() * col);
        arr.push({
          x: X,
          y: Y,
        });
      } else {
        while (repeat(X, Y)) {
          // check if the random X and Y is same as the previous index in arr then again generate the random pos index
          X = Math.floor(0 + Math.random() * row);
          Y = Math.floor(0 + Math.random() * col);
        }
        // if not repeat then push pos index into the array
        arr.push({ x: X, y: Y });
      }

      const imgData = c.getImageData(
        // get the image data for a particular height and width from particular position ..this is to split one single image into desired parts
        i * (W / row),
        j * (H / col),
        W / row,
        H / col
      );
      // push the images parts into imageData array after then
      if (i * j < (row - 1) * (col - 1)) {
        imageData.push({
          // in this push we gonna push object having image parts value and its random i,j position values associated with that particular image portion
          img: imgData,

          x: arr[i * row + j].x,
          y: arr[i * row + j].y,
        });
      }
    }
  }
  // check repeat function
  function repeat(x, y) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x == x && arr[i].y == y) {
        return true;
      }
    }
    return false;
  }

  function swap(arrA, arrB, z) {
    var leftIndex = -1,
      rightIndex = -1,
      upIndex = -1,
      downIndex = -1;
    // for left index of blank area
    leftIndex = findIndex(arrA, arrB, -1, 0);

    // for right index of blank area
    rightIndex = findIndex(arrA, arrB, 1, 0);

    // for up index of blank area
    upIndex = findIndex(arrA, arrB, 0, -1);

    // for down index of blank area
    downIndex = findIndex(arrA, arrB, 0, 1);

    if (z == -1) {
      if (leftIndex >= 0) {
        swapHelper(arrA, arrB, leftIndex);
      }
    }
    if (z == 1) {
      if (rightIndex >= 0) {
        swapHelper(arrA, arrB, rightIndex);
      }
    }

    if (z == -2) {
      if (upIndex >= 0) {
        swapHelper(arrA, arrB, upIndex);
      }
    }
    if (z == 2) {
      if (downIndex >= 0) {
        swapHelper(arrA, arrB, downIndex);
      }
    }
  }

  function swapHelper(arrA, arrB, index) {
    tempX = arrA[arrA.length - 1].x;
    arrA[arrA.length - 1].x = arrB[index].x;
    arrB[index].x = tempX;
    tempY = arrA[arrA.length - 1].y;
    arrA[arrA.length - 1].y = arrB[index].y;
    arrB[index].y = tempY;
  }

  function findIndex(arrA, arrB, a, b) {
    var val;
    arrB.find((elem, index) =>
      elem.x == arrA[arrA.length - 1].x + a &&
      elem.y == arrA[arrA.length - 1].y + b
        ? (val = index)
        : null
    );
    return val;
  }

  c.clearRect(0, 0, W, H);
  animate();
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        console.log("yo");
        swap(arr, imageData, 1);

        break;
      case "ArrowRight":
        console.log("yo");
        swap(arr, imageData, -1);

        break;
      case "ArrowUp":
        console.log("yo");
        swap(arr, imageData, 2);

        break;
      case "ArrowDown":
        console.log("yo");
        swap(arr, imageData, -2);

        break;
      default:
        break;
    }
  });

  function animate() {
    canvas.heigth = window.innerHeight / 2;
    canvas.width = window.innerWidth / 2;
    requestAnimationFrame(animate);
    imageData.forEach((elem, index) => {
      c.putImageData(
        imageData[index].img,
        imageData[index].x * (W / row),
        imageData[index].y * (H / col)
      );
    });

    imgPx.drawBoard(c);
  }
});

///////////////////////////////////////////////////////
