var memCache = {};

const indexType = 'index', topicIndex = 'topicIndex';

var cacheServices = {

    getTopicIndex: function(){
        if(memCache[indexType] && typeof memCache[indexType][topicIndex] === 'number'){
            return memCache[indexType][topicIndex];
        }else{
            this.create(indexType);
            memCache[indexType][topicIndex] = 0;
            return 0;
        }
    },

    addTopicIndex: function(){
        memCache[indexType][topicIndex]++;
    },

    create: function(type){
        if(!memCache[type]){
            memCache[type] = {};
        }
    },

    read: function(type, key){
        if(memCache[type] && memCache[type][key]) {
            return memCache[type][key];
        }
    },

    readAll: function(type){
        if(memCache[type]) {
            return memCache[type];
        }
    },

    update: function(type, key, value){
        if(memCache[type]) {
            memCache[type][key] = value;
        }else{
            this.create(type);
            memCache[type][key] = value;
        }
    },

    delete: function(type, key){
        if(memCache[type] && memCache[type][key]) {
            memCache[type][key] = null;
            delete memCache[type][key];
        }
    }

};

module.exports = cacheServices;