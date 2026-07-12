const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
} = require('../controllers/article.controller');

// All routes below require a valid JWT token
router.use(requireAuth);

// search must come before /:id so Express doesn't treat "search" as an id
router.get('/search', searchArticles);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// upload.single('image') streams the file to Cloudinary before createArticle runs
router.post('/', upload.single('image'), validate, createArticle);

router.put('/:id', validate, updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;