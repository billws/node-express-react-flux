# node-express-react-flux  
  
  
## Build Steps:  
  
### 1. npm run build  
### 2. npm start  
### 3. open browser goto url http://localhost:3000/  
  
  
  
## Front-end key functions  
  
topicStore.jsx  
```JavaScript  
...
...
...
  //Handling the action type and data which pass by dispatcher.
  switch (action.type) {
    case TopicTypes.GET_TOPICS:
      _setResponse(action.response);
      TopicStore.emitChange();
      break;
    default:
      // do nothing
  }
...
...
...
```  
  

topicAction.jsx  
```JavaScript  
...
...
...
//After calling WebAPI, then pass the action types and data to dispatcher.
const Actions = {
  /**
   * Get all topics from server.
   */
  getTopics() {
        jQuery.ajax({
            method: 'GET',
            url: "/api/topic/sorted/20"
        }).then(function(data, textStatus, jqXHR) {
            Dispatcher.dispatch({
                type: TopicTypes.GET_TOPICS,
                response: data
            });
        }, function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            Dispatcher.dispatch({
                type: TopicTypes.GET_TOPICS,
                response: []
            });
        });
  },
...
...
...
```  
  
  
  
## Backend key function  
  
cacheServices.js  
```JavaScript  
/**
 * Contain for cache.
 */
var memCache = {};
...  
...  
...  
var cacheServices = {

/**
 * Get topic index from cache.
 */
    getTopicIndex: function(){
        if(memCache[indexType] && typeof memCache[indexType][topicIndex] === 'number'){
            return memCache[indexType][topicIndex];
        }else{
            this.create(indexType);
            memCache[indexType][topicIndex] = 0;
            return 0;
        }
    },

/**
 * Add 1 to topic index. Auto increase the topic index, as the key.
 */
    addTopicIndex: function(){
        memCache[indexType][topicIndex]++;
    },
...
...
...
/**
 * Read from cache by type name and the key.
 */
    read: function(type, key){
        if(memCache[type] && memCache[type][key]) {
            return memCache[type][key];
        }
    },
...
...
...
/**
 * Update object value by type name, the key, and value.
 */
    update: function(type, key, value){
        if(memCache[type]) {
            memCache[type][key] = value;
        }else{
            this.create(type);
            memCache[type][key] = value;
        }
    },

/**
 * Delete from memory by type name and the key.
 */
    delete: function(type, key){
        if(memCache[type] && memCache[type][key]) {
            memCache[type][key] = null;
            delete memCache[type][key];
        }
    }

};

module.exports = cacheServices;
```  
  
  
voteServices.js
```JavaScript  
...
...
...
/**
 * Get topics' id sorted by upvote descending.
 * Sorting the upvote number and get the topics's id, 
 * then fetch the topic's text using these topics' id.
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
 * Get all from topTopic cache, which only contains top 20 upvote number keys.
 */
    getTopTopics: function(){
        let topTopics = cacheServices.readAll(top20Topics);
        if(typeof topTopics !== "object"){
            topTopics = {};
        }

        return Object.keys(topTopics)
            .sort((x, y) => topTopics[y] - topTopics[x]);
    },

/**
 * When add or update a new key, add it into topTopic cache and get top 20 items after sort.
 */
    setTopTopics: function(topicId, upvoteNumber){
        let topTopics = cacheServices.readAll(top20Topics);
        if(typeof topTopics !== "object"){
            topTopics = {};
        }
        
        topTopics[topicId] = upvoteNumber;
        var updateOrder = {};

        Object.keys(topTopics)
            .sort((x, y) => topTopics[y] - topTopics[x]).slice(0, 20)
            .reduce(function(x, y){x = updateOrder; x[y] = topTopics[y];}, updateOrder);

        cacheServices.updateAll(top20Topics, updateOrder);
        return 0;
    },
...
...
...

/**
 * Remove topicId from topTopic cache and re-sorting.
 */
    removeTopTopics: function(topicId){
        let topTopicsContent = cacheServices.readAll(top20Topics);
        if(!topTopicsContent.hasOwnProperty(topicId)){
            return 0;
        }

        let voteContent = cacheServices.readAll(voteKey);
        delete topTopicsContent[topicId];
        var leftKeyNumbers = Object.keys(topTopicsContent)
                                .sort((x, y) => topTopicsContent[y] - topTopicsContent[x]).slice(0, 20);
        if(leftKeyNumbers.length < Object.keys(voteContent).length){
            let newOrder = {};
            this.getVotesByUpVoteDesc().slice(0, 20)
            .reduce(function(x, y){x = newOrder; x[y] = voteContent[y][0];}, newOrder);
            topTopicsContent = newOrder;
        }
        cacheServices.updateAll(top20Topics, topTopicsContent);
        return 0;
    }

```  
