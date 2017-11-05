var newColElement = []; // store all col element


function createDiv(numberOfRows,numberOfCols) {

  // local variable for this function
  var i = 0;  var j = 0;  var k=0;
  var newrowElement = []; // store all row element
  // To put all the rows in
  var grid = document.getElementById('grid');

  // To put all the cols in respective 
  var colContainer = document.getElementById('grid');

  // first for loop for adding the row
  for (i; i < numberOfRows; i++) {
    newrowElement[i] = document.createElement('div');
    newrowElement[i].className = 'row';
    newrowElement[i].id = ('row'+i);
    console.log(i)
    grid.appendChild(newrowElement[i]);
    // add new row to grid div
    colContainer = document.getElementById('row'+i);
    // second for loop for adding col div to the newly created row div
    for (j; j<numberOfCols; j++){
      k = numberOfRows * i + j
      var temp=k+1
      newColElement[k] = document.createElement('div');
      newColElement[k].className = 'col';
      newColElement[k].style.backgroundImage = 'url(img/p1/l0_p'+temp+'.png)';
      newColElement[k].id = ('col'+k);
      newColElement[k].addEventListener('click',bindClick(k))
      console.log(k)
      colContainer.appendChild(newColElement[k]);
    }
    j=0;
  }
};

// rotate not working yet
function bindClick(k) {
    return function(){
             console.log("you clicked region number " + newColElement[k].id);
             rotate(k)
            };
}

function rotate(k){
    newColElement[k].style.transform = 'rotate(90 deg)';
}

createDiv(4,4);