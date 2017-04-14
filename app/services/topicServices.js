var cacheServices = require('./cacheServices');
var voteServices = require('./voteServices');

const topicKey = "topicCache";
/*

{
    topicId: topicText
}


return 
{
    topicId: 
        {
            topic: topicText,
            vote: [upVoteNumber, downVoteNumber]
        }
}

*/

var topicServices = {

    get: function(topicId){
        let results = {};
        let content = cacheServices.read(topicKey, topicId);
        if(typeof content === 'string'){
            results[topicId] = {
                'topic': content, 
                'vote': voteServices.get(topicId)
            };
        }
        return results;
    },

    getAll: function(){
        let results = {};
        let totalTopics = cacheServices.readAll(topicKey);
        if(typeof totalTopics !== 'undefined'){
            Object.keys(totalTopics).map(key => 
                results[key] = {
                    'topic': totalTopics[key],
                    'vote': voteServices.get(key)
                }
            );
        }
        return results;
    },

    create: function(topicText){
        cacheServices.update(topicKey, cacheServices.getTopicIndex(), topicText);
        cacheServices.addTopicIndex();
    },

    set: function(topicId, topicText){
        let content = cacheServices.read(topicKey, topicId);
        if(typeof content !== 'undefined'){
            content = topicText;
            cacheServices.update(topicKey, topicId, content);
            voteServices.set(topicId, 0, 0);
        }
    },

    remove: function(topicId){
        cacheServices.delete(topicKey, topicId);
        voteServices.remove(topicId);
    }

};


module.exports = topicServices;