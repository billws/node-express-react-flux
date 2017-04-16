var express = require('express');
var topicServices = require('../services/topicServices');
var router = express.Router();

/* Topic actions. */

/**
 * Get all topics.
 */
router.get('/', function(req, res) {
    res.json(topicServices.getAll());
});

/**
 * Get topics sorted by upvote number descending.
 */
router.get('/sorted/:count', function(req, res) {
    let count = 20;
    if(req.params.count > 0 && req.params.count < 50){
        count = req.params.count;
    }
    res.json(topicServices.getTopicsSortedUpvote(count));
});

/**
 * Get topic by topic id.
 */
router.get('/:topicId', function(req, res){
    if(req.params.topicId < 0){
        res.json({message:"Topic ID is not correct."});    
    }else{
        res.json(topicServices.get(req.params.topicId));
    }
});

/**
 * Create topic.
 */
router.post('/', function(req, res){
    if(typeof req.body.topicText === "undefined" || req.body.topicText === ""){
        res.json({message:"No Data."});    
    }else{
        if(req.body.topicText.length < 256){
            res.json(topicServices.create(req.body.topicText));
        }else{
            res.json({message: "text too long."});
        }
    }
});

/**
 * Modify topic by topic id.
 */
router.put('/:topicId', function(req, res){
    if(req.params.topicId < 0 || typeof req.body.topicText === "undefined" || req.body.topicText === ""){
        res.json({message: "Require topic text."});
    }else{
        res.json(topicServices.set(req.params.topicId, req.body.topicText));
    }
});

/**
 * Delete topic by topic id.
 */
router.delete('/:topicId', function(req, res){
    if(req.params.topicId < 0){
        res.json({message:"Topic ID is not correct."});    
    }else{
        res.json(topicServices.remove(req.params.topicId));
    }
    
});

module.exports = router;
