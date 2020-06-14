'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = '.tag-size-';


const titleClickHandler = function (event) {
  event.preventDefault()
  const clickedElement = this

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active')

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active')
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active')

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active')

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active')
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href')

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector)

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active')
};


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = '';


  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector)
  let html = ''
  console.log(articles);

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id')

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML
    // console.log(articleTitle);

    /* get the title from the title element */
    const articleTitleElement = article.getAttribute('article title')
    // console.log(titleList);

    /* create HTML of the link */

    const linkHTMLData = { id: articleId, title: articleTitle }
    const linkHTML = templates.articleLink(linkHTMLData)
    html += linkHTML

  };

  /* insert link into titleList */

  titleList.innerHTML = html

  const links = document.querySelectorAll('.titles a')

  for (let link of links) {
    link.addEventListener('click', titleClickHandler)
  }

};

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' }

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times')

    if (tags[tag] > params.max) {
      params.max = tags[tag]
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag]
    }
  }
  return params;
}

function calculateTagClass(count, params) {

}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {}

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector)
    console.log(tagsWrapper)

    /* make html variable with empty string */
    let html = ''

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags')

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ')

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>'

      /* add generated code to html variable */
      html += linkHTML

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1
      } else {
        allTags[tag]++
      }

      /* END LOOP: for each tag */
    };
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags')

    const tagsParams = calculateTagsParams(allTags)
    console.log('tagsParams:', tagsParams)

    /* [NEW] create variable for all links HTML code */
    const allTagsData = { tags: [] }

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      })
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData)
    console.log(allTagsData)
  }
};

generateTags();

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault()

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this
  console.log(clickedElement)

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(clickedElement)

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '')
  console.log(tag)

  /* find all tag links with class active */
  const findTagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  console.log(findTagLinks)

  /* START LOOP: for each active tag link */
  for (let tag of findTagLinks) {

    /* remove class active */
    findTagLinks = activeLink.classList.remove('.active')
    console.log(findTagLinks)

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const findTagLinksHref = document.querySelectorAll('href')
  console.log(findTagLinksHref)

  /* START LOOP: for each found tag link */
  for (let findTagLinksHref of findTagLinks) {

    /* add class active */
    findTagLinksHref.classList.add('active')

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]')
}

function addClickListenersToTags() {

  /* find all links to tags */
  const findTagLinks = document.querySelectorAll('.post .post-tags a, .list.tags a');
  // const findTagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  console.log(findTagLinks);

  /* START LOOP: for each link */
  for (let tagLink of findTagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
};

addClickListenersToTags();


// funkcja generate authors
function generateAuthors() {

  /* Tworze obiekt który będzie przechowywał wszystkich autorów i podpisuję to pod stałą  */
  let allAuthors = {};
  console.log(allAuthors);

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  // for every article find author
  for (let article of articles) {

    /* znajduje wrapper w html an autorów   */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);

    /* przygotowanie zmiennej HTML  */
    let html = '';

    // get authors from data=authors
    const articleAuthor = article.getAttribute('data-author');

    // generate html link for author  for example <p class="post-author">by Marion Berry</p>
    //const linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    // generujemy link pod template template-author-link
    const linkHTMLData = { author: articleAuthor, author: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;

    } else {

      allAuthors[articleAuthor]++;
    }

    // add generated code to html variable
    html = html + linkHTML;
    console.log(html);

    // insert html link into wrapper
    authorsWrapper.insertAdjacentHTML('beforeend', html);
    console.log(allAuthors);
  }

  // dodawanie autorów do chmury po prawej
  /* pobieram wrapper do autorów z prawego sidebara */
  const authorListSidebar = document.querySelector('.authors');

  // do authors params przypisuje wynik działania funkcji
  const authorsParams = calculateTagsParams(allAuthors);
  console.log('authorParams:', authorsParams);

  //let allTagsHTML = '';
  const allAuthorsData = { authors: [] };

  for (let author in allAuthors) {

    /* generate code of a link and add it to allTagsHTML */
    const authorNumber = calculateTagClass(allAuthors[author], authorsParams);
    console.log('authorNumber:', authorNumber);

    //allTagsHTML += '<li><a class="tag-size-'+ authorNumber +' " href ="#author-' + author + '">'+ author + '</a></li> ';

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorsParams)
    });
  }

  /* add HTML from allTagsHTML to tagList */
  //authorListSidebar.innerHTML = allTagsHTML;

  authorListSidebar.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);

  const authors = document.querySelectorAll('.authors a');

  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }

}
generateAuthors();

// authorClickHandler wzorujac sie na tagClickHandler
function authorClickHandler(event) {

  event.preventDefault();   // prevent default action for this event

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');// read href from clicked element
  console.log(href);

  const author = href.replace('#author-', '');  /* make a new constant authoer and extract tag from the "href" constant */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]'); // find all author links with active class
  console.log(authorLinks);

  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefAuthorLinks);

  for (let hrefAuthorLink of hrefAuthorLinks) {
    hrefAuthorLink.classList.add('active');
    console.log(hrefAuthorLink);
  }

  generateTitleLinks('[data-author="' + author + '"]');

}

// addClickListenersToAuthors wzorujac sie na addClickListenersToTags
function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll('.post .post-author a'); // find all links to tags */
  console.log(authorLinks);

  for (let authorLink of authorLinks) {  // for each link add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
