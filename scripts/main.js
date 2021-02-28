function ajaxGetAsync(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', (_) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    });
    xhr.send();
  });
}

let kyouiku;
let jouyou;

let container;
let kanjiFocus;
let englishLabel;
let readingsLabel;
let gradeLabel;
let strokesLabel;

function focusOnKanji(kanjiItem) {
  kanjiFocus.innerText = kanjiItem.kanji;
  englishLabel.innerText = (Array.isArray(kanjiItem.meaning))
    ? kanjiItem.meaning.join(', ')
    : kanjiItem.meaning;
  gradeLabel.innerText = kanjiItem.grade;
  strokesLabel.innerText = kanjiItem.strokes;
}

window.addEventListener('load', async (_) => {
  container = document.getElementById('container');
  kanjiFocus = document.getElementById('kanjiFocus');
  englishLabel = document.getElementById('englishLabel');
  readingsLabel = document.getElementById('readingsLabel');
  gradeLabel = document.getElementById('gradeLabel');
  strokesLabel = document.getElementById('strokesLabel');

  container.addEventListener('selectstart', (event) => {
    event.preventDefault();
    return false;
  });
  container.addEventListener('selectstart', (event) => {
    event.preventDefault();
    return false;
  });

  let kyouikuJSON = await ajaxGetAsync('./json/kyouiku.json');
  kyouiku = JSON.parse(kyouikuJSON);
  let jouyouJSON = await ajaxGetAsync('./json/jouyou.json');
  jouyou = JSON.parse(jouyouJSON);

  let kanjiTable = document.getElementById('kanjiTable');
  kyouiku.forEach((item) => {
    let kanjiElement = document.createElement('DIV');
    kanjiElement.classList.add('kanji-element');
    kanjiElement.innerText = item.kanji;
    kanjiElement.addEventListener('mouseover', (_) => {
      focusOnKanji(item);
    });
    kanjiElement.addEventListener('click', (_) => {
      focusOnKanji(item);
    });
    kanjiTable.appendChild(kanjiElement);
  });
});
