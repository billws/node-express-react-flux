import React from 'react';
import ReactDOM from 'react-dom';
import TopicAction from '../../actions/topic/topicAction';
import TopicStore from '../../stores/topic/topicStore';

class TopicVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editUpMode: false,
        editDownMode: false,
        newUpVoteNumber: 0,
        newDownVoteNumber: 0
    };
  }
  render() {
    return (
        <div className="divTableCellFront" id={this.props.id}>
            {this.displayUpVoteMode()}
            <div id={"voteNumber"}>{this.props.upvote - this.props.downvote}</div>
            {this.displayDownVoteMode()}
        </div>
    );
  }

  editUpVoteMode() {
    this.setState({editUpMode: !this.state.editUpMode, newUpVoteNumber: this.props.upvote});
  }

  editDownVoteMode() {
    this.setState({editDownMode: !this.state.editDownMode, newDownVoteNumber: this.props.downvote});
  }

  handleUpChange(event) {
    this.setState({newUpVoteNumber: event.target.value});
  }

  handleDownChange(event) {
    this.setState({newDownVoteNumber: event.target.value});
  }

  displayUpVoteMode() {
    if(this.state.editUpMode){
        return (
            <div>
                <input type="text" value={this.state.newUpVoteNumber} onChange={this.handleUpChange.bind(this)} />
                <input type="button" value="Save"  onClick={this.editUpVote.bind(this)} />
                <input type="button" value="Cancel" onClick={this.editUpVoteMode.bind(this)} />
            </div>
        );
    }else{
        return (
            <div>
                <input type="button" value="Upvote" onClick={this.upVote.bind(this)} />
                <input type="button" value="Edit" onClick={this.editUpVoteMode.bind(this)} />
            </div>
        );
    }
  }

  displayDownVoteMode() {
    if(this.state.editDownMode){
        return (
            <div>
                <input type="text" value={this.state.newDownVoteNumber} onChange={this.handleDownChange.bind(this)} />
                <input type="button" value="Save"  onClick={this.editDownVote.bind(this)} />
                <input type="button" value="Cancel" onClick={this.editDownVoteMode.bind(this)} />
            </div>
        );
    }else{
        return (
            <div>
                <input type="button" value="Downvote" onClick={this.downVote.bind(this)} />
                <input type="button" value="Edit" onClick={this.editDownVoteMode.bind(this)} />
            </div>
        );
    }
  }

  editUpVote() {
    if(parseInt(this.state.newUpVoteNumber, 10) !== 'NaN' && parseInt(this.state.newUpVoteNumber, 10) >= 0){
        TopicAction.editUpVote({topicId: this.props.id, voteNumber: this.state.newUpVoteNumber});
        this.setState({editUpMode: !this.state.editUpMode});
    }else{
        alert("Please input correct format.");
    }
  }

  editDownVote() {
    if(parseInt(this.state.newDownVoteNumber, 10) !== 'NaN' && parseInt(this.state.newDownVoteNumber, 10) >= 0){
        TopicAction.editDownVote({topicId: this.props.id, voteNumber: this.state.newDownVoteNumber});
        this.setState({editDownMode: !this.state.editDownMode});
    }else{
        alert("Please input correct format.");
    }
  }

  upVote() {
    TopicAction.upVoteTopics(this.props.id);
  }

  downVote() {
    TopicAction.downVoteTopics(this.props.id);
  }
}

export default TopicVote;