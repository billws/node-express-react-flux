import React from 'react';
import ReactDOM from 'react-dom';

class TopicRank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="divTableCellFront" id={"rank"}>{this.props.rank}</div>
    );
  }
}

export default TopicRank;