function generate() {
  const blocks = document.getElementById("input").value.split(",").map(Number);

  const n = blocks.length;
  const leftMax = [];
  const rightMax = [];

  leftMax[0] = blocks[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], blocks[i]);
  }

  rightMax[n - 1] = blocks[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], blocks[i]);
  }

  console.log(leftMax, "temp", rightMax);
  const water = [];
  let totalWater = 0;

  // in - 0,2,4,1,2,0

  // l = [0,2,4,4,4,4] r=[4,4,4,2,2,0]

  for (let i = 0; i < n; i++) {
    water[i] = Math.min(leftMax[i], rightMax[i]) - blocks[i];
    totalWater += water[i];
  }
  document.getElementById("result").innerText = `Output: ${totalWater} Units`;

  drawTable(blocks, water);
}

function drawTable(blocks, water) {
  const table = document.getElementById("grid");
  table.innerHTML = "";

  const maxHeight = Math.max(...blocks.map((h, i) => h + water[i]));

  console.log("maxHeight", maxHeight);

  for (let row = maxHeight; row >= 1; row--) {
    const tr = document.createElement("tr");

    for (let col = 0; col < blocks.length; col++) {
      const td = document.createElement("td");

      if (row <= blocks[col]) {
        td.className = "block";
      } else if (row <= blocks[col] + water[col]) {
        td.className = "water";
      } else {
        td.className = "empty";
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
}

generate();
