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

class Levels{

  constructor(current_level) {
    this.current_level = current_level;
    this.current_level_complete = false;
    this.max_level = 4;
  }

  get_current_level() {
    return this.current_level
  }

  complete_current_level(){
    this.current_level_complete = true;
  }

  update_next_level() {
    this.current_level = this.current_level+1;
    if (this.current_level === this.max_level+1) {
      this.current_level = 1;
    }
    this.current_level_complete = false;
  }
}

class Gameplay{
  constructor(){
    this.level = new Levels(1)
    this.angle_data = {};
    this.rotation_data = {};
    this.all_angles = [0,90,180,270]
    this.angles = [90,180,270]
    this.data = {};
  }

  reset_level_data(){
    this.angle_data = {};
    this.rotation_data = {};
    this.data = {};
  }

  get_data(level) {
    console.log("get_data() Level=")
    console.log(level);
    var level_prefix = 'https://raw.githubusercontent.com/bhaumikmistry/kurikku/hold-multiple-images/docs/data/levels/'
    var link = level_prefix + level + '.json';
    console.log(link);
    return $.getJSON(link).then(function(data){
        return data;
    })
  } 

  load_new_level(){ 
    this.level.get_current_level();
    this.level.update_next_level();
  }

  load_data(level){
    return this.get_data(level).then(
        function (data) {
          data = {'3-3': {'img': 'src/quarter_0.png'}, '4-3': {'img': 'src/nt_0.png'}, '5-3': {'img': 'src/quarter_270.png'}, '3-4': {'img': 'src/nt_90.png'}, '4-4': {'img': 'src/all.png'}, '5-4': {'img': 'src/nt_270.png'}, '3-5': {'img': 'src/quarter_90.png'}, '4-5': {'img': 'src/nt_180.png'}, '5-5': {'img': 'src/quarter_180.png'}}
          console.log("get_data().then");
          console.log(data);
          return data;
        }
      );
  }

  start(){
    console.log("start");

    let level = this.level.get_current_level();
    console.log(level);

    this.load_data(level).then(
      (data) => {
        let btn = document.getElementById('next');
        btn.onclick = this.onClicNext;
        btn.style.visibility = 'hidden';
        let btn_level = document.getElementById('level');
        btn_level.innerText = '#' + level; 
        this.data = data;
        console.log("after promise");
        this.load_level(data);
      }
    );
  }

  disable_current_level_tiles(data){
    console.log("disable_current_level_tiles()");
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        let key = i+'-'+j;
        if (key in data){
          let img = document.getElementById('col'+i+'_row'+j);
          img.onclick = null;
        }
      }
    }
  }

  end_current_level(data) {
    console.log("end_current_level()");
    this.disable_current_level_tiles(data);
    this.level.complete_current_level();
    this.setup_next_button();
  }

  background_color(state, data) {
    if (state) {
      gp.end_current_level(data);
      if ( !document.getElementById("row-parent").classList.contains('bckcolor') ){
        let element = document.getElementById('row-parent');
        element.classList.add('bckcolor');
        element.style.transition = "background-color 1s";
      }
    }else{
      document.getElementById('row-parent').classList.remove('bckcolor');
    }
  }

  validate_result(data) {
    let values = Object.values(this.rotation_data);
    let res = values.reduce(function(acc, val) { return acc + val; }, 0)
    console.log(res)
    this.background_color(res==0, data);
  }

  onclickEvent(event){
    console.log(event.target.title);
    var angle = (gp.angle_data[event.target.title]) + 90 || 90;
    
    event.target.style.transform = 'rotate(' + angle + 'deg)';
    event.target.style.transition = 'all 0.6s ease';
    gp.angle_data[event.target.title] = angle;
    console.log(gp.angle_data);

    let old_rotation = gp.rotation_data[event.target.title];
    let new_rotation = old_rotation+1;
    if (new_rotation>=4){
      new_rotation=0
    }
    gp.rotation_data[event.target.title]=new_rotation

    console.log(gp.rotation_data);
    gp.validate_result(gp.data);
  }

  load_level(data) {
    console.log("load_level()");
    if (document.getElementById('outerblockleft') === null){
      var iDiv = document.createElement('div');
      iDiv.id = 'outerblockleft';
      iDiv.className = 'column';
      document.getElementById('holder').appendChild(iDiv);
    }

    for (var i = 0; i < 9; i++) {
      if (document.getElementById('column_'+i) === null){
        var columniDiv = document.createElement('div');
        columniDiv.id = 'column_'+i;
        columniDiv.className = 'column';
        document.getElementById('holder').appendChild(columniDiv);
      }
      var columniDiv = document.getElementById('column_'+i);

      for (var j = 0; j < 9; j++) {
        // pixelIDiv.id = 'row_'+j;
        let key = i+'-'+j;
        let img_src = null;
        if (key in data){
          img_src = data[key].img;
        } else {
          img_src = "src/empty_cell.png";
        }
        if (document.getElementById('col'+i+'_row'+j) === null){
          var img = document.createElement('img');
          img.id = 'col'+i+'_row'+j;
          img.title = 'col'+i+'_row'+j;
          img.style = "width:100%";
          columniDiv.appendChild(img);
        }
        var img = document.getElementById('col'+i+'_row'+j);
        img.style.transition = null;
        img.src = img_src;

        if (key in data && img_src !== "src/all.png"){

          var item = this.angles[Math.floor(Math.random()*this.angles.length)];
          this.angle_data['col'+i+'_row'+j] = item;
          img.style.transform = 'rotate(' + item + 'deg)';
          var rotation = this.all_angles.indexOf(item);
          this.rotation_data['col'+i+'_row'+j] = rotation;
          img.style.transition = 'all 0.6s ease';

          img.onclick = this.onclickEvent
        }
        // pixelIDiv.appendChild(img);
      }
    }
    console.log(this.angle_data);
    console.log(this.rotation_data);
    console.log("--init()--")

    if (document.getElementById('outerblockright') === null){
      var iDiv2 = document.createElement('div');
      iDiv2.id = 'outerblockright';
      iDiv2.className = 'column';
      document.getElementById('holder').appendChild(iDiv2);
    }
  }

  onClicNext(event){
    console.log("onclickNext()");
    gp.level.update_next_level();
    let btn = document.getElementById('next');
    btn.style.visibility = 'hidden';
    gp.background_color(false, gp.data);
    gp.start();
  }

  setup_next_button() {
    let btn = document.getElementById('next');
    btn.onclick = null;
    btn.onclick = this.onClicNext;
    btn.style.visibility = 'visible';
  }

}

let btn = document.getElementById('next');
btn.style.visibility = 'hidden';

console.log("start---")
const gp = new Gameplay();
gp.start();



// function loadNewLevel(){ 
//   var level;
// }

// angle_data = {};
// rotation_data = {};
// let all_angles = [0,90,180,270]
// let angles = [90,180,270]

// function disable_current_level_tiles(data){
//   console.log("disable_current_level_tiles()");
//   for (var i = 0; i < 9; i++) {
//     for (var j = 0; j < 9; j++) {
//       key = i+'-'+j;
//       if (key in data){
//         console.log(key);
//         img = document.getElementById('col'+i+'_row'+j);
//         img.onclick = null;
//       }
//     }
//   }
// }



// function validate_result(data) {
//   let values = Object.values(rotation_data);
//   res = values.reduce(function(acc, val) { return acc + val; }, 0)
//   console.log(res)
//   if (res == 0){
//     end_current_level(data);
//     if ( !document.getElementById("row-parent").classList.contains('bckcolor') ){
//       document.getElementById('row-parent').classList.add('bckcolor');
//     }
//   }else{
//     document.getElementById('row-parent').classList.remove('bckcolor');
//   }
// }

// function load_data_to_level(data) {
//   console.log("addElement()");
//   var iDiv = document.createElement('div');
//   iDiv.id = 'outerblock';
//   iDiv.className = 'column';
//   document.getElementById('holder').appendChild(iDiv);

//   for (var i = 0; i < 9; i++) {
//     var columniDiv = document.createElement('div');
//     columniDiv.id = 'column_'+i;
//     columniDiv.className = 'column';
    

//     for (var j = 0; j < 9; j++) {
//       // pixelIDiv.id = 'row_'+j;
//       key = i+'-'+j;
//       if (key in data){
//         img_src = data[key].img;
//       } else {
//         img_src = "src/empty_cell.png";
//       }
//       var img = document.createElement('img');
//       img.src = img_src;
//       img.id = 'col'+i+'_row'+j;
//       img.title = 'col'+i+'_row'+j;
//       img.style = "width:100%";
//       if (key in data){
//         var item = angles[Math.floor(Math.random()*angles.length)];
//         angle_data['col'+i+'_row'+j] = item;
//         img.style.transform = 'rotate(' + item + 'deg)';

//         var rotation = all_angles.indexOf(item);
//         rotation_data['col'+i+'_row'+j] = rotation;

//         img.onclick = function(event){
//           console.log(event.target.title);
//           var angle = (angle_data[event.target.title]) + 90 || 90;
          
//           event.target.style.transform = 'rotate(' + angle + 'deg)';
//           event.target.style.transition = 'all 0.6s ease';
//           angle_data[event.target.title] = angle;
//           console.log(angle_data);

//           let old_rotation = rotation_data[event.target.title];
//           new_rotation = old_rotation+1;
//           if (new_rotation>=4){
//             new_rotation=0
//           }
//           rotation_data[event.target.title]=new_rotation

//           console.log(rotation_data);

//           validate_result(data);
//         }
//       }
//       // pixelIDiv.appendChild(img);
//       columniDiv.appendChild(img);
//     }
//     document.getElementById('holder').appendChild(columniDiv);
//   }
//   console.log(angle_data);
//   console.log(rotation_data);
//   console.log("--init()--")
//   var iDiv2 = document.createElement('div');
//   iDiv2.id = 'outerblock';
//   iDiv2.className = 'column';
//   document.getElementById('holder').appendChild(iDiv2);
// }



