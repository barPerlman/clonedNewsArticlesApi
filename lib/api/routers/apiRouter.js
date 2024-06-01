'use strict';

const express = require('express');
const router = express.Router();
const GeneralController = require('../controllers/generalController');
const {getNews, getTopHeadlines, getContentById} = require('../services/newsapi');

router.get('/health', GeneralController.getHealth);

router.get('/news', async (req, res) => {
  console.log('Attempting to get the latest news');
  const { limit } = req.query;
  try {
    const headlines = await getTopHeadlines(limit);
    return res.status(200).json(headlines);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: `Failed to get top headlines: ${err}`});
  }
});

router.get('/breaking-news', async (req, res) => {
  const { limit } = req.query;
  try {
    const newsArticles = await getNews(limit)
    return res.status(200).json(newsArticles);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

/**
 * added endpoint to get description + content of article as stream
 */
router.get('/breaking-news/content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await getContentById(id, res);
  } catch (err) {
    res.status(404).send('Content not found');
  }
});


module.exports = router;
