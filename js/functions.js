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
    newrowElement[i].style.width = (''+numberOfCols*50+'px');
    console.log("row->" + i)
    grid.appendChild(newrowElement[i]);
    // add new row to grid div
    colContainer = document.getElementById('row'+i);
    // second for loop for adding col div to the newly created row div
    for (j; j<numberOfCols; j++){
      k = numberOfRows * i + j
      var temp=k+1
      newColElement[k] = document.createElement('div');
      newColElement[k].className = 'col';
      if(temp<=9){
        newColElement[k].style.backgroundImage = 'url(img/p2/image_part_00'+temp+'.png)';
      }else if(temp>9 && temp<100){
        newColElement[k].style.backgroundImage = 'url(img/p2/image_part_0'+temp+'.png)';      
      }else{
        newColElement[k].style.backgroundImage = 'url(img/p2/image_part_'+temp+'.png)';
      }
      newColElement[k].id = ('col'+k);
      newColElement[k].addEventListener('click',bindClick(k))
      console.log("col->"+k)
      // adding initial angle information 
      $(newColElement[k]).attr("data-angle", "0");
      colContainer.appendChild(newColElement[k]);
    }
    j=0;
  }
};

// rotate not working yet
function bindClick(k) {
    return function(){
             console.log("you clicked region number " + newColElement[k].id);
             rotate(k,200,90)
            };
}

function rotate(k,animation_speed,angleToRotate){

    var current_angle = +$(newColElement[k]).attr("data-angle");
    console.log("before angle"+current_angle)
    current_angle += angleToRotate
    console.log("before angle"+current_angle)
    $(newColElement[k]).attr("data-angle", current_angle);

    //rotate
    $(newColElement[k]).animate({ rotate: current_angle }, {
                step: function (now, fx) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                    $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },
                duration: animation_speed
            }, 'linear');
    console.log("later angle"+current_angle);

}

function randomInitialRotation(no_rows,no_cols){
  var divNum = 0;
  

  for (divNum; divNum<(no_cols*no_rows); divNum++){
    randomAngleNumber = Math.floor((Math.random() * 4) + 0);
    rotate(divNum,1,(randomAngleNumber*90))
  }

}

createDiv(10,10);
randomInitialRotation(10,10);