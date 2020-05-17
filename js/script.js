'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector)

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  console.log(articles);

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    /* get the title from the title element */
    const articleTitleElement = article.getAttribute('article title');
    // console.log(titleList);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;

  }

  /* insert link into titleList */

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html += linkHTML;

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(clickedElement);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const findTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(findTagLinks);

  /* START LOOP: for each active tag link */
  for (let tag of findTagLinks) {

    /* remove class active */
    findTagLinks = activeLink.classList.remove('.active');
    console.log(findTagLinks);

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const findTagLinksHref = document.querySelectorAll('href');
  console.log(findTagLinksHref);

  /* START LOOP: for each found tag link */
  for (let findTagLinksHref of findTagLinks) {

    /* add class active */
    findTagLinksHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */
  const findTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(findTagLinks);

  /* START LOOP: for each link */
  for (let tagLink of findTagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}

addClickListenersToTags();

function generateAuthors() {

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // start loop for every article
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    console.log(authorWrapper);

    // generate link
    const linkHTML = '<li><a href="#author-' + author + '">by ' + author + '</a></li>';

    // add link to wrapper
    authorWrapper.innerHTML = linkHTML;
  }
}
generateAuthors();
