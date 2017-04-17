import React from 'react';
import ReactDOM from 'react-dom';

class TopicRank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="divTableCellFront">{this.props.rank}</div>
    );
  }
}

  TopicRank.propTypes = {
    rank: React.PropTypes.number.isRequired
  };

export default TopicRank;