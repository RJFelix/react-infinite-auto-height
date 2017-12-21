import React from 'react';

class HeightWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.hasMeasured = false;
    this.measuredHeight = null;

    this.measureHeight = this.measureHeight.bind(this);
  }

  componentDidMount() {
    this.props.onHeightChange(this.measureHeight());
  }

  componentDidUpdate() {
    this.props.onHeightChange(this.measureHeight());
  }

  measureHeight() {
    if(this.hasMeasured) {
      return this.measuredHeight;
    }
    this.measuredHeight = this.ref.getBoundingClientRect().height;
    return this.measuredHeight;
  }

  render() {
    return (
      <span
        ref={ref => this.ref = ref}
      >
        {this.props.children}
      </span>
    )
  }

};

export default HeightWrapper;