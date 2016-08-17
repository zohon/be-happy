var tokensRef = firebase.database().ref('messages/');
tokensRef.on('value', function(snapshot) {

  _.each(snapshot.val(), function(item, index) {
    generateItem(item)
  });

});

function generateItem(item) {
  console.log(item);
  if(!item) {
    return false;
  }
  var section = document.createElement("section");

  var img = document.createElement("img");
  if(item && item.img) {
    img.src = item.img;
  }
  section.appendChild(img);

  var content = document.createElement("div");
  content.className = "content";

  var divtitle = document.createElement("div");
  divtitle.className = "title";
  divtitle.textContent = item.title;
  content.appendChild(divtitle);

  var divtext = document.createElement("div");
  divtext.className = "text";
  divtext.textContent = item.text;
  content.appendChild(divtext);

  section.appendChild(content);

  document.body.insertBefore(section, document.body.childNodes[0]);
}

function submitMsg(datas) {
  firebase.database().ref('messages/').push({
    title : datas.get('title'),
    text : datas.get('text'),
    img : datas.get('img'),
    icon : datas.get('icon')
  });
}
