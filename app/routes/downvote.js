var express = require('express');
var voteServices = require('../services/voteServices');
var router = express.Router();

/* Downvote actions. */
router
.get('/topicId/:topicId', function(req, res, next) {
    res.json(voteServices.get(req.params.topicId));
})
.post('/', function(req, res, next){
    res.json(voteServices.setDownVoteNumber(req.body.topicId, req.body.voteNumber));
})
.put('/topicId/:topicId', function(req, res, next){
    res.json(voteServices.downVote(req.params.topicId));
});

module.exports = router;
