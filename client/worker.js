self.onmessage = function(e){
  fetch('/api/getallusers')
      .then(res => res.json())
      .then(res => {console.log(res);postMessage(res)})
      .catch(err => console.log('GET to /api/getsession FAILED ', err));
}