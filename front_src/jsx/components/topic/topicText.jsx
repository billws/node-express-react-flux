import React from 'react';
import ReactDOM from 'react-dom';
import TopicAction from '../../actions/topic/topicAction';
import TopicStore from '../../stores/topic/topicStore';

class TopicText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editMode: false,
        newText: ""
    };
  }
  render() {
    if(this.state.editMode){
        return (
            <div className="divTableCellBack" style={{"position":"relative"}}>
                <input type="text" value={this.state.newText}  onChange={this.handleChange.bind(this)} style={{"width":"90%"}} />
                <input type="button" value="Save" style={{"position":"absolute", "right":"60px"}} onClick={this.editTopic.bind(this)} />
                <input type="button" value="Cancel" style={{"position":"absolute", "right":"0px"}} onClick={this.editText.bind(this)} />
            </div>
        );
    }else{
        return (
            <div className="divTableCellBack" style={{"position":"relative"}}>
                {this.props.topicText}
                <input type="button" value="Edit" style={{"position":"absolute", "right":"60px"}} onClick={this.editText.bind(this)} />
                <input type="button" value="Delete" style={{"position":"absolute", "right":"0px"}} onClick={this.deleteTopic.bind(this)} />
            </div>
        );
    }
  }

  /**
   * Handle input change.
   * @param {event} event 
   */
  handleChange(event) {
    this.setState({newText: event.target.value});
  }

  /**
   * Enable edit mode.
   */
  editText() {
    this.setState({editMode: !this.state.editMode, newText: this.props.topicText});
  }

  /**
   * Check input and call action.
   */
  editTopic() {
    if(this.state.newText !== "" && this.state.newText.length < 256){
        TopicAction.editTopics(this.props.id, {topicText: this.state.newText});
        this.setState({editMode: !this.state.editMode, newText: ""});
    }else{
        alert("Please input correct format.");
    }
  }

  /**
   * Delete topic.
   */
  deleteTopic() {
      let confirmStatus = window.confirm("Are you sure?");
      if (confirmStatus == true) {
        TopicAction.deleteTopics(this.props.id);
      }
  }

}

export default TopicText;
