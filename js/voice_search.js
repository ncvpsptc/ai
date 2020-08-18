document.getElementById('voice_search').disabled = (typeof(webkitSpeechRecognition)=="undefined");


export default function enableVoiceSearch(triggerSearch) {
  if(typeof(webkitSpeechRecognition)!="undefined") {
    // Derived from SpeakJS (https://github.com/amazinigmech2418/SpeakJS)
    const recognize = (callback,lang) => {
      let speechdata = new webkitSpeechRecognition();
      speechdata.lang = lang;
      speechdata.onresult = callback;
      speechdata.start();
    }
    const recognitionEvent = e => {
      triggerSearch(e.results[0][0].transcript);
    } 
    document.getElementById('voice_search').addEventListener('click', () => {
      recognize(recognitionEvent,"en");
    });
  }
}
