var Dog = require('../models/dog');
// List of all Dogs
exports.dog_list = async function(req, res) {
//  res.send('NOT IMPLEMENTED: Dog list');
try{
    theDog = await Dog.find();
    res.send(theDog);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
};
exports.dog_view_all_Page = async function(req, res) {
    try{
    theDogs = await Dog.find();
    console.log(theDogs)
    res.render('dog', { title: 'Dog Search Results', results: theDogs });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific Dog.
exports.dog_detail = async function(req, res) {
//  res.send('NOT IMPLEMENTED: Dog detail: ' + req.params.id);
console.log("detail" + req.params.id)
try {
result = await Dog.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};
// Handle Dog create on POST.
// Handle Dog create on POST.
exports.dog_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Dog();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"dog_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.age = req.body.age;
    document.breed = req.body.breed;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// Handle Dog delete form on DELETE.
exports.dog_delete = async function(req, res) {
//  res.send('NOT IMPLEMENTED: Dog delete DELETE ' + req.params.id);
console.log("delete " + req.params.id)
try {
result = await Dog.findByIdAndDelete(req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};
// Handle Dog update form on PUT.
exports.dog_update_put = async function(req, res) {
//  res.send('NOT IMPLEMENTED: Dog update PUT' + req.params.id);
console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await Dog.findById( req.params.id)
 // Do updates of properties
 if(req.body.name) 
    toUpdate.name = req.body.name;
 if(req.body.cost) toUpdate.cost = req.body.cost;
 if(req.body.size) toUpdate.size = req.body.size;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`);
 }
};

exports.dog_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Dog.findById(req.query.id)
    res.render('dogdetail',{ title: 'Dog Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };