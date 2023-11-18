

const btn = document.querySelector("#myBtn");
const randomBtn = document.querySelector("#randomBtn");
btn.addEventListener("click", () => {
  const myWorker = new Worker("worker.js");

  myWorker.postMessage("any message");


  myWorker.onmessage = function(e){
  
    document.querySelector("#output").innerHTML = e.data
  }
})

randomBtn.addEventListener("click", () => {
  document.querySelector("#random").innerHTML = "Random";
})

