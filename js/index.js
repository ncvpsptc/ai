import { get } from "./data_get.js"
import { search } from "./search.js"
import { createTrigger } from "./ai.js"
import { enableVoiceSearch } from "./voice_search.js"


export default function startAI {
  this.data = get(url);
  this.search = s => search(s, this.data);
  enableVoiceSearch(createTrigger(this.search));
}
