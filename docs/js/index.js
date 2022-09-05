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

var DEBUG = true; 

function get_local_level(){
  var data = localStorage.getItem("kurikku-0-0-1");
  if (data !== undefined){
    return parseInt(data);
  }
  return 1;
}

function save_local_level(level){
  localStorage.setItem("kurikku-0-0-1", level);
}

class Levels{

  constructor() {
    this.current_level = get_local_level();
    this.current_level_complete = false;
    this.max_level = 0;
  }

  is_last_level() {
    return this.current_level === this.max_level;
  }

  get_current_level() {
    return this.current_level
  }

  complete_current_level(){
    this.current_level_complete = true;
  }

  update_next_level() {
    console.log("update_next_level()");
    console.log(this.max_level);
    this.current_level = this.current_level+1;
    save_local_level(this.current_level);
    if (this.current_level === this.max_level+1) {
      this.current_level = 1;
      save_local_level(this.current_level);
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
          // data = {'3-3': {'img': 'src/quarter_0.png'}, '4-3': {'img': 'src/nt_0.png'}, '5-3': {'img': 'src/quarter_270.png'}, '3-4': {'img': 'src/nt_90.png'}, '4-4': {'img': 'src/all.png'}, '5-4': {'img': 'src/nt_270.png'}, '3-5': {'img': 'src/quarter_90.png'}, '4-5': {'img': 'src/nt_180.png'}, '5-5': {'img': 'src/quarter_180.png'}}
          return data;
        }
      );
  }

  start(){
    let level = this.level.get_current_level();
    console.log("start="+level);
    this.load_data(level).then(
      (data) => {
        let btn = document.getElementById('next');
        btn.onclick = null;
        btn.style.visibility = 'hidden';
        let btn_level = document.getElementById('level');
        btn_level.innerText = '#' + level; 
        this.data = data;
        console.log("Loading data()");
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
    this.background_color(res==0, data);
  }

  onclickEvent(event){
    console.log("onclickEvent()");
    var angle = (gp.angle_data[event.target.title]) + 90 || 90;

    event.target.style.transform = 'rotate(' + angle + 'deg)';
    event.target.style.transition = 'all 0.6s ease';
    gp.angle_data[event.target.title] = angle;

    let old_rotation = gp.rotation_data[event.target.title];
    let new_rotation = old_rotation+1;
    if (new_rotation>=4){
      new_rotation=0
    }
    gp.rotation_data[event.target.title]=new_rotation
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
    console.log("setup_next_button");
    let btn = document.getElementById('next');
    btn.onclick = null;
    if (this.level.is_last_level()) {
      let btn_level = document.getElementById('level');
      btn_level.innerText = 'Completed!!'; 
      btn.textContent = "Restart"
      btn.onclick = this.onClickRestart;
    } else {
      btn.textContent = "Next"
      btn.onclick = this.onClicNext;
    }
    btn.style.visibility = 'visible';
  }

  onClickRestart(event) {
    let btn = document.getElementById('next');
    btn.style.visibility = 'hidden';
    btn.textContent = "Next"
    btn.onclick = null;
    save_local_level(1);
    gp.level = new Levels()
    gp.start();
  }
}



let btn = document.getElementById('next');
btn.style.visibility = 'hidden';
let btnRe = document.getElementById('restart');
btnRe.style.visibility = 'hidden';

console.log("start---")
const gp = new Gameplay();
gp.get_data("config").then(
  function (data) {
    console.log("get_data().then");
    console.log(data);
    gp.level.max_level = data["max-level"]
    return data;
  }
).then(
  function(data) {
    gp.start();
  }
);

// reset levels
console.log(save_local_level(1));
// console.log(get_local_level());