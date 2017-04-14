var express = require('express');
var voteServices = require('../services/voteServices');
var router = express.Router();

/* Upvote actions. */
router
.get('/topicId/:topicId', function(req, res, next) {
    res.json(voteServices.get(req.params.topicId));
})
.post('/', function(req, res, next){
    res.json(voteServices.setUpVoteNumer(req.body.topicId, req.body.voteNumber));
})
.put('/topicId/:topicId', function(req, res, next){
    res.json(voteServices.upVote(req.params.topicId));
});

module.exports = router;
