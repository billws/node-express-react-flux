import React from 'react';
import ReactDOM from 'react-dom';
import TopicAction from '../../actions/topic/topicAction';
import TopicStore from '../../stores/topic/topicStore';

class AddTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        topicText: ""
    };
  }

  render() {
    return (
        <div style={{"position": "relative", "width": "100%"}} >
            <div style={{"display": "inline-block"}} >Create New Topic: </div>
            <input type="text" style={{"width": "60%", "display": "inline-block"}} value={this.state.topicText} onChange={this.handleChange.bind(this)}/>
            <input type="button" value="Submit" style={{"display": "inline-block"}} onClick={this.createTopic.bind(this)} />
            <input type="button" value="Cancel" style={{"display": "inline-block"}} onClick={this.cancelTopic.bind(this)}/>
        </div>
    );
  }

  /**
   * Handle input change.
   * @param {event} event 
   */
  handleChange(event) {
    this.setState({topicText: event.target.value});
  }

  /**
   * Check input string and call action.
   */
  createTopic() {
    if(this.state.topicText !== "" && this.state.topicText.length < 256){
        TopicAction.createTopics({topicText: this.state.topicText});
        this.setState({topicText: ""});
    }else{
        alert("Please input correct format.");
    }
  }
  
  /**
   * Clear input.
   */
  cancelTopic() {
    this.setState({topicText: ""});
  }
}

export default AddTopic;