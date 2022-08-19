// const columns = row.children[0].children;
// const contributor = document.getElementsByClassName('contributor')[0];

// function changeContributor(contributorName) {
//   contributor.innerHTML = `Contributor: ${contributorName[0] !== '@' ? '@' + contributorName : contributorName}`
// }

// function clearContributor() {
//   contributor.innerHTML = "";
// }

// clearContributor();

// for (var i = 0; i < columns.length; i++) {
//   var column = columns[i];s
//   if (column.children.length > 0) {
//     var images = column.children;
//     for (var j = 0; j < images.length; j++) {
//       var image = images[j];
//       if (image.getAttribute('title') !== `UNCLAIMED_${i}_${j + 1}`) {
//         image.onmouseenter = (e) => changeContributor(e.target.getAttribute('title'));
//         image.onmouseleave = (e) => clearContributor();
//       }
//     }
//   }
// }



// document.getElementsByClassName('button-main')[2].addEventListener('click', function () {
//   this.style.backgroundColor = 'yellow';
//   let images = [
//     'plus.png',
//     'quarter_0.png',
//     'quarter_90.png',
//     'quarter_180.png',
//     'quarter_270.png',
//     'right_angle_0.png',
//     'right_angle_90.png',
//     'right_angle_180.png',
//     'right_angle_270.png',
//     'start_end_0.png',
//     'start_end_90.png',
//     'start_end_180.png',
//     'start_end_270.png',
//     'straight_0.png',
//     'straight_90.png',
//     't_0.png',
//     't_90.png',
//     't_180.png',
//     't_270.png'
//   ];
//   var squares = document.querySelectorAll('[title^="UNCLAIMED"]');
//   squares.forEach(element => {
//     element.src = 'src/' + images[Math.floor(Math.random() * images.length)];
//   });
// })


// document.getElementsByClassName('button-main')[3].addEventListener('click', function () {
//   var squares = document.querySelectorAll('[title]');
//   squares.forEach(element => {
//     element.animate([
//       { transform: 'rotate('+ Math.floor(Math.random() * 360) +'deg)' },
//       { transform: 'rotate('+ Math.floor(Math.random() * 360) +'deg)' },
//       { transform: 'rotate('+ Math.floor(Math.random() * 360) +'deg)' },
//       { transform: 'rotate('+ Math.floor(Math.random() * 360) +'deg)' },
//       { transform: 'rotate('+ Math.floor(Math.random() * 360) +'deg)' }
//     ],{
//       duration: 5000,
//     })
//   });
// })

// document.getElementsByClassName('button-main')[4].addEventListener('click', function () {
//   this.style.backgroundColor = 'yellow';
//   location.reload();
// })

function getCurrentLevel(){
  return 1;
}

function loadNewLevel(){ 
  var level;
}

angle_data = {};
rotation_data = {};
let all_angles = [0,90,180,270]
let angles = [90,180,270]

function validate_result() {
  let values = Object.values(rotation_data);
  res = values.reduce(function(acc, val) { return acc + val; }, 0)
  console.log(res)
  if (res == 0){
    if ( !document.getElementById("row-parent").classList.contains('bckcolor') ){
      document.getElementById('row-parent').classList.add('bckcolor');
    }
  }else{
    document.getElementById('row-parent').classList.remove('bckcolor');
  }
}

function addElement(data) {

  console.log("addElement()");
  var iDiv = document.createElement('div');
  iDiv.id = 'outerblock';
  iDiv.className = 'column';
  document.getElementById('holder').appendChild(iDiv);

  for (var i = 0; i < 9; i++) {
    var columniDiv = document.createElement('div');
    columniDiv.id = 'column_'+i;
    columniDiv.className = 'column';
    

    for (var j = 0; j < 9; j++) {
      // pixelIDiv.id = 'row_'+j;
      key = i+'-'+j;
      if (key in data){
        img_src = data[key].img;
      } else {
        img_src = "src/empty_cell.png";
      }
      var img = document.createElement('img');
      img.src = img_src;
      img.title = 'col'+i+'_row'+j;
      img.style = "width:100%";
      if (key in data){

        var item = angles[Math.floor(Math.random()*angles.length)];
        angle_data['col'+i+'_row'+j] = item;
        img.style.transform = 'rotate(' + item + 'deg)';

        var rotation = all_angles.indexOf(item);
        rotation_data['col'+i+'_row'+j] = rotation;

        img.onclick = function(event){
          console.log(event.target.title);
          var angle = (angle_data[event.target.title]) + 90 || 90;
          
          event.target.style.transform = 'rotate(' + angle + 'deg)';
          event.target.style.transition = 'all 0.6s ease';
          angle_data[event.target.title] = angle;
          console.log(angle_data);

          let old_rotation = rotation_data[event.target.title];
          new_rotation = old_rotation+1;
          if (new_rotation>=4){
            new_rotation=0
          }
          rotation_data[event.target.title]=new_rotation

          console.log(rotation_data);

          validate_result();

        }
      }
    
      // pixelIDiv.appendChild(img);
      columniDiv.appendChild(img);
    }
    document.getElementById('holder').appendChild(columniDiv);
  }

  console.log(angle_data);
  console.log(rotation_data);
  console.log("--init()--")

  var iDiv2 = document.createElement('div');
  iDiv2.id = 'outerblock';
  iDiv2.className = 'column';

  // var columniDiv = document.createElement('div');
  // columniDiv.id = 'column_1'

  // var pixelIDiv = document.createElement('div');
  // pixelIDiv.id = 'row_1';

  // var img = document.createElement('img');
  // img.src = "src/empty_cell.png";
  // img.title = "c1_r1";

  // pixelIDiv.appendChild(img);
  // columniDiv.appendChild(pixelIDiv);

  // // document.getElementsByTagName('body')[0].appendChild(iDiv);
  // console.log(document.getElementById('holder'));
  document.getElementById('holder').appendChild(iDiv2);
  // document.getElementById('holder').appendChild(columniDiv);

}


get_data().then(
  function (data) {
    console.log("get_data().then");
    console.log(data);
    addElement(data);
  }
);
