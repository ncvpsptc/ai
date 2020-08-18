export default function require(url) {
  let rtrn;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.onload = e => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr);
        rtrn = xhr.responseText;
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = e => {
    console.error(xhr.statusText);
  };
  xhr.send(null);
  return rtrn;
}
