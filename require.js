function require(url) {
var rtrn;
try {
var xhr = new XMLHttpRequest();
xhr.open("GET", url, false);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      rtrn = xhr.responseText;
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);
} catch {
try {
var worker = new Worker("webworker.js");  
  worker.onmessage = function(event) {  
    rtrn = event.data;
  };

  worker.postMessage(url);
} catch {
rtrn = "error";


}

}
return rtrn;
}