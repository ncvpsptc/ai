import { get } from "./get_data.js"
import { search } from "./search.js"
import { createTrigger } from "./ai.js"
import { enableVoiceSearch } from "./voice_search.js"


export function startAI(url) {
  const data = get(url);
  enableVoiceSearch(createTrigger(s => search(s, data)));
}
