var express = require('express');
var router = express.Router();
const passport = require('passport');

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }

// Require controller modules.
var api_controller = require('../controllers/api');
var dog_controller = require('../controllers/dog');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Dog.
router.post('/dogs', dog_controller.dog_create_post);
// DELETE request to delete Dog.
router.delete('/dogs/:id', dog_controller.dog_delete);
// PUT request to update Dog.
router.put('/dogs/:id', dog_controller.dog_update_put);
// GET request for one Dog.
router.get('/dogs/:id', dog_controller.dog_detail);
// GET request for list of all Dog items.
// router.get('/dogs', dog_controller.dog_list);
router.get('/dogs', dog_controller.dog_view_all_Page);
router.get('/detail', dog_controller.dog_view_one_Page);
router.get('/create',secured, dog_controller.dog_create_Page);
router.get('/update',secured, dog_controller.dog_update_Page);
router.get('/delete',secured, dog_controller.dog_delete_Page);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
   });
module.exports = router;