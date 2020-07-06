const ignorePunctuation = txt => txt.split('').filter(n => [",", ".", "!", "?", "-"].indexOf(n) == -1).join('');

const splitWords = txt => txt.split(" ").map(n => n.toLowerCase());

const checkArticle = word => ['the', 'a', 'to', 'and', 'is', 'you', 'i', 'how', 'do'].indexOf(word) == -1;

const ignoreArticles = split => split.filter(checkArticle);

function checkUsage(split, ref) {
  let uses = 0;
  let r = splitWords(ignorePunctuation(ref));
  for(let i of split) {
    if(r.indexOf(i) != -1) {
      uses++;
    }
  }
  return uses/split.length;
}

function titleSearch(split) {
  let max = 0;
  let results = [];
  let resUsages = [];
  let max_holder;
  for(let a of data) {
    let usage = checkUsage(split, a.title);
    if(max < usage) {
      max = usage;
      max_holder = a;
    }
    if(usage>0) {
      results.push(a);
      resUsages.push(usage);
    }
  }
  return {
    max: max_holder,
    res: results.map((_, i) => Object({
      obj: results[i],
      usage: resUsages[i]
    }))
  }
}

function contentSearch(split) {
  let max = 0;
  let results = [];
  let resUsages = [];
  let max_holder;
  for(let a of data) {
    let usage = checkUsage(split, a.title + " " + a.transcript);
    if(max < usage) {
      max = usage;
      max_holder = a;
    }
    if(usage > 0) {
      results.push(a);
      resUsages.push(usage);
    }
  }
  return {
    max: max_holder,
    res: results.map((_, i) => Object({
      obj: results[i],
      usage: resUsages[i]
    }))
  }
}

function getMin(arr) {
  let min = Infinity;
  let mins = [];
  for(let z of arr) {
    if(z.usage < min) {
      min = z.usage;
    }
  }
  for(let z of arr) {
    if(z.usage <= min) {
      mins.push(z.obj);
    }
  }
  return {
    obj: mins,
    usage:min
  };
}

const appendHTML = (html, location) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  location.appendChild(div);
};

const encodeData = data => {
  let p = document.createElement('p');
  p.textContent = data;
  return p.innerHTML;
};


function render(arr) {
  let a = arr;
  let results = [];
  while(a.length > 0) {
    let d = getMin(a);
    results = d.obj.concat(results);
    a = a.filter(n => n.usage != d.usage);
  }
  for(let x of results) {
    appendHTML(`
    <a href="${x.video}">${encodeData(x.title)}</a>
    `, document.getElementById('results'));
    /*let y = document.createElement("A");
    y.textContent = x.title;
    y.href = x.video;
    let br = document.createElement('BR');
    document.getElementById('results').append(y,br);*/
  }
}

appendHTML('<div id="results"></div>', document.body);

function search(s) {
  document.getElementById('results').innerHTML="";
  let txt = ignorePunctuation(s);
  let split = splitWords(txt);
  split = ignoreArticles(split);
  if(contentSearch(split).res.length > 0 && (contentSearch(split).res)) {
    appendHTML(`
    <p>Best Result:</p>
    <a href="${contentSearch(split).max.video}">${contentSearch(split).max.title}</a>
    <p>Total Results:</p>
    `, document.getElementById('results'));
    render(contentSearch(split).res);
    appendHTML(`
    <p>If you couldn't find what you needed please <a href="https://docs.google.com/forms/d/e/1FAIpQLSeulMhD4xrkv0ocT3aDNu-wf-Qb6OiaBY1UH-jQHIlD8fX5dQ/viewform">request a video to be made.</a></p>
    `, document.getElementById('results'));
  } else {
    appendHTML(`
    <p>Sorry. No videos match your search. Please try again or <a href="https://docs.google.com/forms/d/e/1FAIpQLSeulMhD4xrkv0ocT3aDNu-wf-Qb6OiaBY1UH-jQHIlD8fX5dQ/viewform">request a video to be made.</a></p>
    `, document.getElementById('results'));
  }
}
