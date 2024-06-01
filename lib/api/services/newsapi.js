'use strict';
const {generateUUID} = require('../../utils/utilFunctions');
const axios = require('axios');
const { Readable } = require('stream');

const API_KEY = 'd06cdd7c8b334597937526058d954857';

// mapping of article ids with their content saved in getNews that separated them from metadata
// in aim to make requests faster and separate streaming from article metadata
const idToContentMap = new Map();

const getTopHeadlines = async (desiredResults) => {
  const top_headlines_url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(top_headlines_url);
    console.log(`Received ${response.data.articles.length} results of top headlines`);
    let finalData = response.data;
    if (desiredResults) {
      finalData.articles = getRandomItems(response.data.articles, desiredResults);
      finalData.totalResults = finalData.articles.length;
    }
    return finalData
  } catch (err) {
    console.error(`Failed to get top headlines: ${err}`);
    throw err
  }
}

/**
 * get the content saved for an article in request for article
 * performed earlier
 */
const getContentById = async (id, res) => {
  if (!idToContentMap.has(id)) {
    console.error(`article id ${id} not found in contents map`);
    throw new Error('Content not found');
  }
  const content = idToContentMap.get(id);
  const chunkSize = 64; //size in characters

  let index = 0;
  const readable = new Readable({
    read() {
      const pushChunk = () => {
        if (index >= content.length) {
          this.push(null); // Signal the end of the stream
        } else {
          const chunk = content.slice(index, index + chunkSize);
          this.push(chunk);
          index += chunkSize;
        }
      };

      pushChunk(); // Push the first chunk
      this.on('drain', pushChunk); // Push subsequent chunks
    }
  });
  readable.pipe(res); //connect readable stream pipe to response
}

// changed the default request to return single article
const getNews = async (desiredResults = 1) => {
  idToContentMap.clear();
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-05-01&sortBy=publishedAt&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(url);
    let finalData = response.data;
    finalData.articles = getRandomItems(response.data.articles, desiredResults);
    finalData.totalResults = finalData.articles.length;

    // here I changed the response to include articles without description and content
    // and with unique id mapped to the saved description + content so it will be possible to retrieve it
    return {
      success: finalData.success,
      totalResults: finalData.totalResults,
      articles: [
          ...finalData.articles.map((article) => {
            const currentArticleId = generateUUID();
            idToContentMap.set(currentArticleId, `${article.description} ${article.content}`)
            return {
              id: currentArticleId,
                  source: article.source,
                author: article.author,
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt
            }
          })
      ]
    }
  } catch (err) {
    console.error(`Failed to get top headlines: ${err}`);
    throw err
  }
};

function getRandomItems(arr, count) {
  let tempArray = [...arr];

  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]]; // ES6 destructuring swap
  }

  return tempArray.slice(0, count);
}

module.exports = {
  getTopHeadlines,
  getNews,
  getContentById
};

