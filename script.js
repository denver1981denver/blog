const blogContainer = document.querySelector('.blog__container');
const articleContainer = document.querySelector('.article');

const loadGoods = async () => {
  const result = await fetch(' https://gorest.co.in/public-api/posts');

  const data = await result.json();

  return data.data;
};

const renderArticle = async (title) => {
  const data = await loadGoods();
  let articleContent;
  let userID;
  data.map(item => {
    if(item.title === title) {
      articleContent = item.body;
      userID = item.user_id;
    }
  });

  articleContainer.insertAdjacentHTML('afterbegin', `
  <div class="article__container">
  <h1 class="article__title">${title}</h1>
  
    <div class="article__content">
      <p class="article__text">${articleContent}</p>
    </div>

    <div class="article__wrapper">
      <a class="article__link" href="blog.html">К списку статей</a>
      <p class="article__author">
        <cite>${userID}</cite>
      </p>
    </div>
  </div>
  `);
 }

const handleCardClick = async (e) => {
  const titleTarget = e.target.closest('.card__title');
  let title;
  if (titleTarget) {
    title = titleTarget.textContent
  };
  renderArticle(title);
};

const renderGoods = async () => {
  const data = await loadGoods();
  const cardsWrapper = document.createElement('ul');
  cardsWrapper.className = 'cards';

const goods = data.map((item, i) => {
    const card = document.createElement('li');
    card.className = 'card';

    const img = document.createElement('div');
    img.className = 'card__image';
    img.style.backgroundImage = `url("https://loremflickr.com/400/400?${++i}")`;

    const link = document.createElement('a');
    link.className = 'card__link';
    link.setAttribute('href', 'article.html');
    

    const title = document.createElement('h2');
    title.className = 'card__title';
    title.textContent = item.title;

    link.addEventListener('click', handleCardClick);
    
    link.append(title);
    card.append(img, link)

    return card;;
      
  });

  cardsWrapper.append(...goods);
    blogContainer.append(cardsWrapper);
};

renderGoods();







