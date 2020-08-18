export function createTrigger(search) {
  document.getElementById('txt').addEventListener("keydown", e => {
    if(e.key=="Enter") {
      search(document.getElementById('txt').value);
    }
  });

  function triggerSearch(s) {
    document.getElementById("txt").value = s;
    let event = document.createEvent("Event");
    event.initEvent("keydown",true,true);
    event.key = "Enter";
    document.getElementById('txt').dispatchEvent(event);
  }
  return triggerSearch;
}
