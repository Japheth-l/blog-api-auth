const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  author:   { type: String, required: true },
  tags:     { type: [String], default: [] },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, default: null }, // stores Cloudinary URL, never raw binary
}, { timestamps: true });

articleSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Article', articleSchema);