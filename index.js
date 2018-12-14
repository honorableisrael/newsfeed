const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

let request = new XMLHttpRequest();
request.open('GET', 'https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=442cd341c9ec4008856d5ea670c6be16', true);
request.onload = function(){

  // Begin accessing JSON data here
  let datas = JSON.parse(this.response);
  let data = datas.articles;
  console.log(data);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(news => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const br = document.createElement('br');
      const h1 = document.createElement('h1');
      h1.textContent = news.title;
      const h4 = document.createElement('h4');
      h4.textContent = `Author:${news.author}  ${news.source.id}`
      h4.setAttribute('class','author')
      const p = document.createElement('p');
      news.content = news.content.substring(0, 300);
      p.textContent = `${news.content}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(h4);
    });
  } else {
    const errorMessage = document.createElement('h3');
    errorMessage.textContent = `Something broke, it's not working! `;
    app.appendChild(errorMessage);
  }
}

request.send();