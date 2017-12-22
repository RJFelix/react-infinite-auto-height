import React from 'react';
import Infinite from 'react-infinite';
import HeightWrapper from './height-wrapper';

class InfiniteAutoHeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heights: new Array(props.children.length).fill(props.defaultHeight || 345),
    };

    this.updateHeight = this.updateHeight.bind(this);
  }

  updateHeight(i, newHeight) {
    if(newHeight === this.state.heights[i]
      || newHeight === 0)
      return;
    this.setState(prevState => {
      const newHeights = prevState.heights.slice(0);
      newHeights[i] = newHeight;
      return {
        heights: newHeights,
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if(this.state.heights.length !== newProps.children.length) {
      if(this.state.heights.length < newProps.children.length) {
        this.setState(prevState => {
          const oldHeights = prevState.heights.slice(0);
          const newHeights = new Array(newProps.children.length - this.state.heights.length)
            .fill(newProps.defaultHeight || 345);
          return {
            heights: oldHeights.concat(newHeights)
          };
        })
      } else {
        // new children is shorter than existing children,
        // so start from scratch
        this.setState({
          heights: new Array(newProps.children.length).fill(newProps.defaultHeight || 345)
        });
      }
    }
  }

  render() {
    const children = this.props.children.map((child, i) => (
      <HeightWrapper
        key={`hw_${child.key}`}
        onHeightChange={newHeight => this.updateHeight(i, newHeight)}
      >
        {child}
      </HeightWrapper>
    ));
    return (
      <Infinite
        elementHeight={this.state.heights}
        {...this.props}
      >
        {children}
      </Infinite>
    )
  }
}

export default InfiniteAutoHeight;