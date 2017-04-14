var express = require('express');
var topicServices = require('../services/topicServices');
var router = express.Router();

/* Topic actions. */
router
.get('/', function(req, res, next) {
    res.json(topicServices.getAll());
})
.get('/:topicId', function(req, res, next){
    res.json(topicServices.get(req.params.topicId));
})
.post('/', function(req, res, next){
    res.json(topicServices.create(req.body.topicText));
})
.put('/:topicId', function(req, res, next){
    res.json(topicServices.set(req.params.topicId, req.body.topicText));
})
.delete('/:topicId', function(req, res, next){
    res.json(topicServices.remove(req.params.topicId));
});

module.exports = router;
