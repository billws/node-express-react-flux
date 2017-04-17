import React from 'react';
import ReactDOM from 'react-dom';
import TopicRank from './topicRank';
import TopicText from './topicText';
import TopicVote from './topicVote';
import AddTopic from './addTopic';
import TopicAction from '../../actions/topic/topicAction';
import TopicStore from '../../stores/topic/topicStore';

class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        topics: []
    };
  }

  /**
   * Bind event.
   */
  componentDidMount() {
    TopicStore.addChangeListener(this._onChange.bind(this));
    TopicAction.getTopics();
  }

  /**
   * Unbind event.
   */
  componentWillUnmount() {
    TopicStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let topicsDOM = [];
    this.state.topics.map(function(item, i){
        let topicKey = Object.keys(item)[0];
        topicsDOM.push(
            <TopicItem 
              key={topicKey} 
              id={topicKey} 
              rank={i+1}
              upvote={item[topicKey].vote[0]} 
              downvote={item[topicKey].vote[1]} 
              topicText={item[topicKey].topic}
              />
        )});
    return (
        <div className="divTable">
          <div className="divCaption">
            <AddTopic />
          </div>
          <br />
          <div className="divTableBody">
            <div className="divTableRow">
                <div className="divTableCellFront">Rank</div>
                <div className="divTableCellFront">Vote</div>
                <div className="divTableCellBack">Topic</div>
            </div>
            {topicsDOM}
          </div>
        </div>
    );
  }

  /**
   * Reset state if data change.
   */
  _onChange(){
    let response = TopicStore.getResponse();
    this.setState({topics: response});
  }
}

class TopicItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="divTableRow">
            <TopicRank rank={this.props.rank}/>
            <TopicVote id={this.props.id} upvote={this.props.upvote} downvote={this.props.downvote}/>
            <TopicText id={this.props.id} topicText={this.props.topicText}/>
        </div>
    );
  }
}

  TopicItem.propTypes = {
    rank: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
    upvote: React.PropTypes.number.isRequired,
    downvote: React.PropTypes.number.isRequired,
    topicText: React.PropTypes.string.isRequired
  };


export default Topics;