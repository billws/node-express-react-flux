import Dispatcher from '../../dispatcher/dispatcher';
import TopicTypes from '../../constants/topicConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'topicsEvent';
var totalTopics = [];

function _setResponse(response){
  totalTopics = response;
}

var TopicStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getResponse: function() {
    return totalTopics;
  }
});

TopicStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case TopicTypes.GET_TOPICS:
      _setResponse(action.response);
      TopicStore.emitChange();
      break;
    default:
      // do nothing
  }
});

export default TopicStore;
