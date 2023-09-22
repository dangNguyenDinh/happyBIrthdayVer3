function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      document.querySelector("#p2").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#trash").play();
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }



var paper = document.querySelector("#p2");
dragElement(paper); 
var pen = document.querySelector("#pen");


//code bên trên là đi copy trên mạng, để sử dụng chuột để di chuyển một phần tử

//promise để delay
function delay(ms){
  return new Promise(
    (resolve, reject)=>{
      setTimeout(()=>{
        resolve();
      }, ms);
    }
  )
}



var p1 = document.querySelector("#p1");
var dragbook = document.querySelector("#dragbook");
var all = document.querySelector("#all");
// pen.addEventListener('mousemove', ()=>{
//   pen.style.width = "1.3%";
//   if(!(pen.offsetTop+pen.clientHeight < dragbook.offsetTop || pen.offsetTop + pen.clientHeight > p1.offsetTop + dragbook.clientHeight || pen.offsetLeft < dragbook.offsetLeft || pen.offsetLeft > dragbook.offsetLeft+dragbook.clientLeft)){
//       alert("csdc");
//   }
// })


// pen.addEventListener('mouseleave', ()=>{
//   pen.style.width = "1.5%";
//   if(!(pen.offsetTop+pen.clientHeight < dragbook.offsetTop || pen.offsetTop + pen.clientHeight > p1.offsetTop + dragbook.clientHeight || pen.offsetLeft < dragbook.offsetLeft || pen.offsetLeft > dragbook.offsetLeft+dragbook.clientLeft)){
//     alert("csdc");
//   }
// })

// if(!(pen.offsetTop+pen.clientHeight < dragbook.offsetTop || pen.offsetTop + pen.clientHeight > p1.offsetTop + dragbook.clientHeight || pen.offsetLeft < dragbook.offsetLeft || pen.offsetLeft > dragbook.offsetLeft+dragbook.clientLeft)){
//   alert("csdc");
// }

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  document.querySelector("#pen").style = ' animation: penWrite 2s linear; position: absolute; top: 5vh; left: 5vw; transform: rotateZ(30deg); width: 5%';
  document.querySelector("#write").play();

  delay(2000)
  .then(()=>{
    write();
    pen.style.display = 'none';
    return delay(1000);
  })
  .then(()=>{
    
    let count = 0;
    let main = setInterval(()=>{
      var newElement = document.createElement("img");
      newElement.className = `leaf`;
      newElement.src = "./assetForMe/leaf.png";
      newElement.alt = "leaf";
      document.querySelector("#wrapper").appendChild(newElement);
      document.querySelector("style").textContent += // += để thêm thuộc tính mà ko bị xoá đi
        `@keyframes fireWork${count} {
          0%{
              top: 42vh;
              left: 50vw;
          }
          100%{
              top: -10vh;
              left: ${Math.random()*100+1}vw;
          }
        }
      `
      newElement.style = `animation: fireWork${count} 1s linear`;
      if(count >100) {
        clearInterval(main);
      }
      count ++;
    }, 0);
    return delay(2000);
  })
  .then(()=>{
    let leafs = document.querySelectorAll(".leaf");
    for(let i=0; i <= 101 ;i++){
      leafs[i].remove();
    }
    document.querySelector("style").textContent = "";
  })
  .then(()=>{
    let count = 0;
    let main = setInterval(()=>{
      var newElement = document.createElement("img");
      newElement.className = `leaf`;
      newElement.src = "./assetForMe/leaf.png";
      newElement.alt = "leaf";
      document.querySelector("#wrapper").appendChild(newElement);
      document.querySelector("style").textContent += // += để thêm thuộc tính mà ko bị xoá đi
        `@keyframes fall${count} {
          0%{
              top: -60vh;
              left: ${Math.random()*150-20}vw;
          }
          100%{
              top: 160vh;
              left: ${Math.random()*150 -20}vw;
              display: none;
          }
        }
      `
      newElement.style = `animation: fall${count} 1s linear; width: 40vh; top: 160vh`;
      document.querySelector("#p1").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#word").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#pen").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#happy").style = 'animation: appeared 3s linear; display: block';
      document.querySelector("#song").play();





      if(count >500) {
        clearInterval(main);
      }
      count ++;
    }, 0);
    return delay(2000);
  })
} 


function write(){
  document.querySelector("#word").style = "display: block; animation: wordAppear 1s linear";
}

var windowWidth = window.innerWidth;

if (windowWidth < 1080){

  document.querySelector("#p2").addEventListener('click', ()=>{
    document.querySelector("#p2").style = 'animation: disappeared 1s linear; display: none;';
    document.querySelector("#trash").play();
  })
  document.querySelector("#pen").addEventListener('click', ()=>{
    document.querySelector("#pen").style.animation = 'disappeared 2s linear';
  document.querySelector("#write").play();

  delay(2000)
  .then(()=>{
    write();
    pen.style.display = 'none';
    return delay(1000);
  })
  .then(()=>{
    
    let count = 0;
    let main = setInterval(()=>{
      var newElement = document.createElement("img");
      newElement.className = `leaf`;
      newElement.src = "./assetForMe/leaf.png";
      newElement.alt = "leaf";
      document.querySelector("#wrapper").appendChild(newElement);
      document.querySelector("style").textContent += // += để thêm thuộc tính mà ko bị xoá đi
        `@keyframes fireWork${count} {
          0%{
              top: 42vh;
              left: 50vw;
          }
          100%{
              top: -10vh;
              left: ${Math.random()*100+1}vw;
          }
        }
      `
      newElement.style = `animation: fireWork${count} 1s linear`;
      if(count >100) {
        clearInterval(main);
      }
      count ++;
    }, 0);
    return delay(2000);
  })
  .then(()=>{
    let leafs = document.querySelectorAll(".leaf");
    for(let i=0; i <= 101 ;i++){
      leafs[i].remove();
    }
    document.querySelector("style").textContent = "";
  })
  .then(()=>{
    let count = 0;
    let main = setInterval(()=>{
      var newElement = document.createElement("img");
      newElement.className = `leaf`;
      newElement.src = "./assetForMe/leaf.png";
      newElement.alt = "leaf";
      document.querySelector("#wrapper").appendChild(newElement);
      document.querySelector("style").textContent += // += để thêm thuộc tính mà ko bị xoá đi
        `@keyframes fall${count} {
          0%{
              top: -60vh;
              left: ${Math.random()*150-20}vw;
          }
          100%{
              top: 160vh;
              left: ${Math.random()*150 -20}vw;
              display: none;
          }
        }
      `
      newElement.style = `animation: fall${count} 1s linear; width: 40vh; top: 160vh`;
      document.querySelector("#p1").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#word").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#pen").style = 'animation: disappeared 1s linear; display: none;';
      document.querySelector("#happy").style = 'animation: appeared 3s linear; display: block';
      document.querySelector("#song").play();





      if(count >500) {
        clearInterval(main);
      }
      count ++;
    }, 0);
    return delay(2000);
  })
  })
}



    