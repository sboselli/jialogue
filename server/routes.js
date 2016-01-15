import express from 'express';

const router = express.Router();

// Home
router.get('/', function(req, res, next) {
  res.render('index');
});

// Data
router.get('/data', function(req, res, next) {
  res.send({
    movies: ['Terminator', 'Blow'],
    directors: ['Coppola', 'Scorcese']
  });
});

module.exports = router;