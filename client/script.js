const btn = document.querySelector("#myBtn");
const randomBtn = document.querySelector("#randomBtn");
btn.addEventListener("click", () => {
  performance.mark('testStart');
  const myWorker = new Worker("worker.js");

  myWorker.postMessage("any message");


  myWorker.onmessage = function(e){
    let sum = 0;
    for(let i = 0; i< 10000000000; i++){
      sum += i;
    }
    document.querySelector("#output").innerHTML = e.data
  }
  performance.mark('testEnd')
  performance.measure('runTest', 'testStart', 'testEnd')
  let timeTaken = performance.getEntriesByName('runTest')[0].duration
  console.log('time taken: ', timeTaken)
})

randomBtn.addEventListener("click", () => {
  document.querySelector("#random").innerHTML = "Random";
})

