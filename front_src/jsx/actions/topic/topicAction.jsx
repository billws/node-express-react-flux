import TopicTypes from '../../constants/topicConstants';
import Dispatcher from '../../dispatcher/dispatcher';

const Actions = {
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
  createTopics(postData) {
        jQuery.ajax({
            method: 'POST',
            url: "/api/topic/",
            data: postData
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  editTopics(topicId, postData) {
        jQuery.ajax({
            method: 'PUT',
            url: "/api/topic/" + topicId,
            data: postData
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  deleteTopics(topicId) {
        jQuery.ajax({
            method: 'DELETE',
            url: "/api/topic/" + topicId
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  upVoteTopics(topicId) {
        jQuery.ajax({
            method: 'PUT',
            url: "/api/upvote/topicid/" + topicId
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  downVoteTopics(topicId) {
        jQuery.ajax({
            method: 'PUT',
            url: "/api/downvote/topicid/" + topicId
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  editUpVote(postData) {
        jQuery.ajax({
            method: 'POST',
            url: "/api/upvote/",
            data: postData
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  },
  editDownVote(postData) {
        jQuery.ajax({
            method: 'POST',
            url: "/api/downvote/",
            data: postData
        }).then(function(data, textStatus, jqXHR) {
            this.getTopics();
        }.bind(this), function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            console.log(errorMessage);
            this.getTopics();
        }.bind(this));
  }
};

export default Actions;