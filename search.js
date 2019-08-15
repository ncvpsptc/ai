function ignorePunctuation(txt) {
var t = "";
for(var i=0; i<txt.length; i++) {
if(Array(",",".","!","?","-").indexOf(txt[i])==-1) {
t+=txt[i];
}
}
return t;
}

function splitWords(txt) {
var split = txt.split(" ");
for(i in split) {
split[i] = split[i].toLowerCase();
}
return split
}

function checkArticle(word) {
return Array("the",'a','to','and','is','you','i','how','do').indexOf(word)==-1;
}

function ignoreArticles(split) {
return split.filter(checkArticle);
}

function checkUsage(split,ref) {
var uses = 0;
var r = splitWords(ignorePunctuation(ref));
for(i in split) {
if(r.indexOf(split[i])!=-1) {
uses++;
}
}
return uses/split.length;
}

function titleSearch(split) {
var max=0;
var results = [];
var resUsages = [];
var max_holder;
for(a in data) {

var usage = checkUsage(split,data[a].title);
var bool = (max<usage);
if(bool) {
max = checkUsage(split,data[a].title);
max_holder = data[a];
}
if(usage>0) {
results.push(data[a]);
resUsages.push(usage)
}
}
var rtrn = new Object();
rtrn.max = max_holder;
rtrn.res = new Array();
for(i in results) {
rtrn.res[i] = new Object();
rtrn.res[i].obj = results[i];
rtrn.res[i].usage = resUsages[i];
}
return rtrn;
}

function contentSearch(split) {
var max=0;
var results = [];
var resUsages = [];
var max_holder;
for(a in data) {

var usage = checkUsage(split,data[a].title+" "+data[a].transcript);
var bool = (max<usage);
if(bool) {
max = checkUsage(split,data[a].title+" "+data[a].transcript);
max_holder = data[a];
}
if(usage>0) {
results.push(data[a]);
resUsages.push(usage)
}
}
var rtrn = new Object();
rtrn.max = max_holder;
rtrn.res = new Array();
for(i in results) {
rtrn.res[i] = new Object();
rtrn.res[i].obj = results[i];
rtrn.res[i].usage = resUsages[i];
}
return rtrn;
}

function getMin(arr) {
var min = 100;
var mins = [];
for(z in arr) {
if(arr[z].usage<min) {
min = arr[z].usage;
//mins.push(arr[z].obj)
}
}
for(z in arr) {
if(arr[z].usage<=min) {
min = arr[z].usage;
mins.push(arr[z].obj);
}
}
return {obj:mins,usage:min};
}


function render(arr) {
var a=arr;
var results = [];
while(a.length>0) {
console.log(a);
var d = getMin(a);
console.log(d);
results = d.obj.concat(results);
a = a.filter(function(e){return e.usage!=d.usage});
}
for(x in results) {
var y = document.createElement("A");
y.innerHTML = results[x].title;
y.href = results[x].video;
var br = document.createElement('BR');
document.getElementById('results').append(y,br);
}
}

var resultsDiv = document.createElement("div");
resultsDiv.setAttribute('id','results');
document.body.appendChild(resultsDiv);
function search(s) {
document.getElementById('results').innerHTML="";
var txt = ignorePunctuation(s);
var split = splitWords(txt);
split = ignoreArticles(split);
if(contentSearch(split).res.length>0 && (contentSearch(split).res)){
var p = document.createElement('P');
p.innerHTML = "Best Result:"
document.getElementById('results').appendChild(p);
var link = document.createElement('A');
link.href = contentSearch(split).max.video;
link.innerHTML = contentSearch(split).max.title;
document.getElementById('results').appendChild(link);
var p = document.createElement('P');
p.innerHTML = "Total Results:"
document.getElementById('results').appendChild(p);
render(contentSearch(split).res);
var p = document.createElement('P');
var a = document.createElement('A');
a.href = "https://docs.google.com/forms/d/e/1FAIpQLSeulMhD4xrkv0ocT3aDNu-wf-Qb6OiaBY1UH-jQHIlD8fX5dQ/viewform";
a.innerHTML = "request a video to be made.";
p.innerHTML = "If you couldn't find what you needed please ";
p.appendChild(a);
document.getElementById('results').appendChild(p);
} else {
var p = document.createElement('P');
var a = document.createElement('A');
a.href = "https://docs.google.com/forms/d/e/1FAIpQLSeulMhD4xrkv0ocT3aDNu-wf-Qb6OiaBY1UH-jQHIlD8fX5dQ/viewform";
a.innerHTML = "request a video to be made.";
p.innerHTML = "Sorry. No videos match your search. Please try again or ";
p.appendChild(a);
document.getElementById('results').appendChild(p);
}
}