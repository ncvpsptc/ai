import { require } from "./require.js"

export function get(url) {
  const _d = require(url).split('\n').map(i => i.split(','));
  let d = [];
  for(let i=1; i<_d.length; i++) {
    let __d = {};
    for(let j in _d[i]) {
      __d[_d[0][j]] = _d[i][j];
    }
    d.push(__d);
  }
  return d;
}
