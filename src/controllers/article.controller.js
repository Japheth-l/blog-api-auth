const Article = require('../models/article.models');

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
};

const createArticle = async (req, res, next) => {
  try {
    // req.file is attached by Multer after streaming the file to Cloudinary
    // req.file.path is the secure Cloudinary URL returned after upload
    const imageUrl = req.file ? req.file.path : null;

    const article = await Article.create({
      ...req.body,
      userId: req.user.id,
      imageUrl, // only the URL string is saved, never the raw binary
    });

    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (article.userId.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (article.userId.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
};

const searchArticles = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query param q is required' });
    const results = await Article.find({ $text: { $search: q } });
    res.json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
};