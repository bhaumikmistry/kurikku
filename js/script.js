var newColElement = []; // store all col elements

/**
 * Creates div with all rows and columns
 * @constructor
 * @param {string} numberOfRows - The number of rows.
 * @param {string} numberOfCols - The number of columns.
 */
function createDiv(numberOfRows, numberOfCols, image_path, image_name, image_extension) {

  // initialize vars
  var i = j = k = 0;
  var newrowElement = []; // store all row elements

  // grab the main div that can contain all rows
  var grid = document.getElementById('grid');

  // To put all the cols in respective 
  var colContainer = document.getElementById('grid');

  // add rows
  for (i = 0; i < numberOfRows; i++) {
    newrowElement[i] = document.createElement('div');
    newrowElement[i].className = 'row';
    newrowElement[i].id = ('row' + i);
    newrowElement[i].style.width = ('' + numberOfCols*50 + 'px');
    console.log("row->" + i)
    // add newly created row to grid div
    grid.appendChild(newrowElement[i]);
    // grab the newly created row that can contain col blocks
    colContainer = document.getElementById('row'+i);
    // add cols to the newly created row
    for (j = 0; j < numberOfCols; j++){
	  // convert 2d array into 1d to assign images for each col block
      k = numberOfRows * i + j
	  // image selector variable (since cols start with zero indices but images are named starting 1)
      var img_no = k + 1
      newColElement[k] = document.createElement('div');
      newColElement[k].className = 'col';
      if (img_no <= 9){
          newColElement[k].style.backgroundImage = 'url('+image_path+image_name+'_00' + img_no + '.'+image_extension+')';
      } else if ( 9 < img_no  && img_no < 100) {
          newColElement[k].style.backgroundImage = 'url('+image_path+image_name+'_0'+ img_no + '.'+image_extension+')';
      } else {
          newColElement[k].style.backgroundImage = 'url('+image_path+image_name+ img_no + '.'+image_extension+')';
      }
      newColElement[k].id = ('col' + k);
      newColElement[k].addEventListener('click', bindClick(k))
      console.log("col->"+k)
      // set initial angle information 
      $(newColElement[k]).attr("data-angle", "0");
      colContainer.appendChild(newColElement[k]);
    }
  }
};

function bindClick(k) {
    return function(){
             console.log("you clicked region number " + newColElement[k].id);
             rotate(k,200,90)
            };
}

function rotate(k,animation_speed,angleToRotate){

    var current_angle = +$(newColElement[k]).attr("data-angle");
    console.log("before angle" + current_angle)
    new_angle = current_angle + angleToRotate
    $(newColElement[k]).attr("data-angle", new_angle);

    //rotate
    $(newColElement[k]).animate({ rotate: new_angle }, {
                step: function (now, fx) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                    $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },
                duration: animation_speed
            }, 'linear');
    /***
 	Trying something to not let angle exceed the value 360 but this changes direction of rotation
 	if (new_angle == 360){
        new_angle = 0
    }
    $(newColElement[k]).attr("data-angle", new_angle);
	***/
    console.log("later angle" + new_angle);
}

function randomInitialRotation(no_rows, no_cols){
  var divNum = 0;

  for (divNum; divNum < (no_cols*no_rows); divNum++){
    randomAngleNumber = Math.floor((Math.random() * 4) + 0);
    rotate(divNum, 1 , (randomAngleNumber*90))
  }
}

createDiv(10,10,'img/p2/','image_part','png');
randomInitialRotation(10,10);
