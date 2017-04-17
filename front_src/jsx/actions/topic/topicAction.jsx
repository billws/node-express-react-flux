import TopicTypes from '../../constants/topicConstants';
import Dispatcher from '../../dispatcher/dispatcher';

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

  /**
   * Create new topic.
   * @param {object} postData - Should contain attribute name topicText, ex: {topicText: "text"}.
   */
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

  /**
   * Edit topic.
   * @param {number} topicId
   * @param {object} postData - Should contain attribute name topicText, ex: {topicText: "text"}.
   */
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

  /**
   * Delete topic.
   * @param {number} topicId 
   */
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

  /**
   * upvote a topic.
   * @param {number} topicId 
   */
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

  /**
   * Downvote a topic.
   * @param {number} topicId 
   */
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

  /**
   * Edit upvote number.
   * @param {object} postData - {topicId: 1, voteNumber: 50}
   */
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

  /**
   * Edit downvote number.
   * @param {object} postData -  {topicId: 1, voteNumber: 50}
   */
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