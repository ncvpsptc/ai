self.onmessage = function (event) {
  
    var xhr = new XMLHttpRequest();
    xhr.open("GET", event.data, false);  // synchronous request
    xhr.send(null);
    self.postMessage(xhr.responseText);
  
};