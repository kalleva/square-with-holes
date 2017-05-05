function createGrid(width, height) {
  var grid = document.getElementsByClassName('grid')[0];
  for (var i = 0; i < height; i++) {
    var row = document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < width; j++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      var hole = document.createElement('div');
      hole.classList.add('hole');
      cell.appendChild(hole);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function locateBorder() {
  var grid = document.getElementsByClassName('grid')[0];
  var plane = grid.getBoundingClientRect();
  var centerX = plane.right - plane.width / 2;
  var centerY = plane.bottom - plane.height / 2;
  var radius = Math.hypot(centerX, centerY);
  if (counter > 2 * radius) {
    counter = 0;
  }
  var rows = grid.children;
  for (var i = 0; i < rows.length; i++) {
    var cellsInRow = rows[i].children;
    for (var j = 0; j < cellsInRow.length; j++) {
      var hole = cellsInRow[j].children[0];
      var rect = hole.getBoundingClientRect();
      var holeX = rect.right - rect.width / 2;
      var holeY = rect.bottom - rect.height / 2;
      if (counter < radius){
        if (Math.hypot(holeX - centerX, holeY - centerY) < counter) {
          hole.classList.add('full');
        }
      } else {
        if (counter - radius < counter) {
          if (Math.hypot(holeX - centerX, holeY - centerY) < counter - radius) {
            hole.classList.remove('full');
          }
        }
      }
    }
  }
}

createGrid(60, 60);

var counter = 0;
function draw() {
  requestAnimationFrame(draw);
  counter += 5;
  locateBorder();
}
draw();
