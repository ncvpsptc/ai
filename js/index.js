import { get } from "./get_data.js"
import { search } from "./search.js"
import { createTrigger } from "./ai.js"
import { enableVoiceSearch } from "./voice_search.js"


export function startAI(url) {
  const data = get(url);
  const search = s => search(s, data);
  enableVoiceSearch(createTrigger(search));
}
