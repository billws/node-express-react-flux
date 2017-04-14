var cacheServices = require('./cacheServices');

const voteKey = "voteCache";
/*

{
    topicId: [upVoteNumber, downVoteNumber]
}

*/

var voteServices = {

    get: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            return content;
        }else{
            this.set(topicId, 0, 0);
            return [0, 0];
        }
    },

    getTop20ByUpVoteDesc: function(){

    },

    set: function(topicId, upVoteNumber, downVoteNumber){
        cacheServices.update(voteKey, topicId, [upVoteNumber, downVoteNumber]);
    },

    setUpVoteNumer: function(topicId, upVoteNumber){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            this.set(topicId, upVoteNumber, content[1]);
        }
    },

    setDownVoteNumber: function(topicId, downVoteNumber){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            this.set(topicId, content[0], downVoteNumber);
        }
    },

    upVote: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            content[0]++;
            cacheServices.update(voteKey, topicId, content);
        }else{
            this.set(topicId, 1, 0);
        }
    },

    downVote: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            content[1]++;
            cacheServices.update(voteKey, topicId, content);
        }else{
            this.set(topicId, 0, 1);
        }
    },

    remove: function(topicId){
        cacheServices.delete(voteKey, topicId);
    }

};


module.exports = voteServices;