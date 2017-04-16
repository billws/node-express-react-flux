var express = require('express');
var voteServices = require('../services/voteServices');
var router = express.Router();

/* Upvote actions. */

/**
 * Get upvote by topic id.
 */
router.get('/topicId/:topicId', function(req, res) {
    if(req.params.topicId < 0){
        res.json({message: "Topic id is not correct."});
    }else{
        res.json(voteServices.get(req.params.topicId));
    }
});

/**
 * Modify upvote number by topic id.
 */
router.post('/', function(req, res){
    if(typeof req.body.topicId === "undefined" || req.body.topicId < 0 || typeof req.body.voteNumber === "undefined" || req.body.voteNumber < 0){
        res.json({message:"Input data is not correct."});
    }else{
        res.json(voteServices.setUpVoteNumer(req.body.topicId, req.body.voteNumber));
    }
    
});

/**
 * Add 1 to upvote number by topic id.
 */
router.put('/topicId/:topicId', function(req, res){
    if(req.params.topicId < 0){
        res.json({message:"Topic id is not correct."});
    }else{
        res.json(voteServices.upVote(req.params.topicId));
    }
});

module.exports = router;
