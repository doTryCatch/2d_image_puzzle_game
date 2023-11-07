const canvas = document.getElementById("can");
const c = canvas.getContext("2d");
const c2 = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
var H = canvas.height = rect.height;
var W = canvas.width = rect.width;
const row = 5;
const col = 5;
const imgPx = new imgPixels(W, H, row, col);
const img = new Image();


document.querySelector("#image").addEventListener("change",(e)=>{
  console.log(e.target.files)

  const selectedFile = e.target.files[0];
  if (selectedFile) {
  const imageUrl = URL.createObjectURL(selectedFile); // Create a URL for the selected image
document.querySelector('.img').src=imageUrl
img.src=imageUrl
document.querySelector('.image_container').style.display="flex"
}

})
// imgPx.drawBoard(c); 
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
        let index=i * col + j
        imageData.push({
          // in this push we gonna push object having image parts value and its random i,j position values associated with that particular image portion
          img: imgData,
          x: arr[index].x,
          y: arr[index].y,
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
    // x position swap
    tempX = arrA[arrA.length - 1].x;
    arrA[arrA.length - 1].x = arrB[index].x;
    arrB[index].x = tempX;

    // y position swap
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
  document.querySelector('.left').addEventListener("click",()=>{
    swap(arr, imageData, 1);

  })
  document.querySelector('.right').addEventListener("click",()=>{
    
    swap(arr, imageData, -1);
    
  })
  document.querySelector('.up').addEventListener("click",()=>{
    swap(arr, imageData, 2);

    
  })
  document.querySelector('.down').addEventListener("click",()=>{
    swap(arr, imageData, -2);
    
  })
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft": 
        swap(arr, imageData, 1);
        break;
      case "ArrowRight":
         swap(arr, imageData, -1);
          break;
      case "ArrowUp":
        swap(arr, imageData, 2);
        break;
      case "ArrowDown":
        swap(arr, imageData, -2);
        break;

      default:
        break;
    }
  });


  function animate() {
   canvas.height=H
   canvas.width=W
    requestAnimationFrame(animate);
    imgPx.drawBoard(c); 
    imageData.forEach((elem, index) => {
      c.putImageData(
        imageData[index].img,
        imageData[index].x * (W / row),
        imageData[index].y * (H / col)
      );
    });

   
  }
});

///////////////////////////////////////////////////////
