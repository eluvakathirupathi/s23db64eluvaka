var express = require('express');
const dog_controlers= require('../controllers/dog');
var router = express.Router();

/* GET Dogs  */
router.get('/dog', dog_controlers.dog_view_all_Page);

// {
//   // res.render('dog', { title: 'Search Results Dog' });
// }
// );
router.get('/',function(req, res, next){
  res.render('dog', { title: 'Search Results Dog' });
});

module.exports = router;
