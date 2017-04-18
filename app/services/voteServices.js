var cacheServices = require('./cacheServices');

const voteKey = "voteCache";
/*
Vote number format in cache.
{
    topicId: [upVoteNumber, downVoteNumber]
}

*/

var voteServices = {
/**
 * Get vote by topic id.
 */
    get: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            return content;
        }else{
            if(topicId < cacheServices.getTopicIndex()){
                this.set(topicId, 0, 0);
            }
            return [0, 0];
        }
    },

/**
 * Get topics' id sorted by upvote descending.
 */
    getVotesByUpVoteDesc: function(){
        let allVote = cacheServices.readAll(voteKey);
        if(typeof allVote !== "object"){
            allVote = {};
        }
        return Object.keys(allVote)
            .sort((x,y) => allVote[y][0] - allVote[x][0]);
    },

/**
 * Modify upvote/downvote number by topic id.
 */
    set: function(topicId, upVoteNumber, downVoteNumber){
        cacheServices.update(voteKey, topicId, [upVoteNumber, downVoteNumber]);
        return 0;
    },

/**
 * Modify upvote number by topic id.
 */
    setUpVoteNumer: function(topicId, upVoteNumber){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            this.set(topicId, upVoteNumber, content[1]);
        }
        return 0;
    },

/**
 * Modify downvote number by topic id.
 */
    setDownVoteNumber: function(topicId, downVoteNumber){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            this.set(topicId, content[0], downVoteNumber);
        }
        return 0;
    },

/**
 * Add 1 to upvote number by topic id.
 */
    upVote: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            content[0]++;
            cacheServices.update(voteKey, topicId, content);
        }
        return 0;
    },

/**
 * Add 1 to downvote number by topic id.
 */
    downVote: function(topicId){
        let content = cacheServices.read(voteKey, topicId);
        if(Array.isArray(content)){
            content[1]++;
            cacheServices.update(voteKey, topicId, content);
        }
        return 0;
    },

/**
 * Remove vote number by topic id.
 */
    remove: function(topicId){
        cacheServices.delete(voteKey, topicId);
        return 0;
    }

};


module.exports = voteServices;