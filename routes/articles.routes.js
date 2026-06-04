const express = require('express');
const router = express.Router();
const Article = require('../models/article.models');
const validate = require('../middleware/validate');

// 1. SEARCH route - SPECIFIC routes FIRST
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query param q is required' });
    const results = await Article.find({ $text: { $search: q } });
    res.json(results);
  } catch (err) {
    next(err);  // ← Use next, not direct response
  }
});

// 2. GET all articles
router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

// 3. GET single article - PARAMETERIZED routes AFTER specific ones
router.get('/:id', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);  // ← Fixed: removed duplicate response
  }
});

// 4. POST create article
router.post('/', validate, async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
});

// 5. PUT update article
router.put('/:id', validate, async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
});

// 6. DELETE article
router.delete('/:id', async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;