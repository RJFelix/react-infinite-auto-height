'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInfinite = require('react-infinite');

var _reactInfinite2 = _interopRequireDefault(_reactInfinite);

var _heightWrapper = require('./height-wrapper');

var _heightWrapper2 = _interopRequireDefault(_heightWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteAutoHeight = function (_React$Component) {
  _inherits(InfiniteAutoHeight, _React$Component);

  function InfiniteAutoHeight(props) {
    _classCallCheck(this, InfiniteAutoHeight);

    var _this = _possibleConstructorReturn(this, (InfiniteAutoHeight.__proto__ || Object.getPrototypeOf(InfiniteAutoHeight)).call(this, props));

    _this.state = {
      heights: new Array(props.children.length).fill(props.defaultHeight || 345)
    };

    _this.updateHeight = _this.updateHeight.bind(_this);
    return _this;
  }

  _createClass(InfiniteAutoHeight, [{
    key: 'updateHeight',
    value: function updateHeight(i, newHeight) {
      if (newHeight === this.state.heights[i] || newHeight === 0) return;
      this.setState(function (prevState) {
        var newHeights = prevState.heights.slice(0);
        newHeights[i] = newHeight;
        return {
          heights: newHeights
        };
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this2 = this;

      if (this.state.heights.length !== newProps.children.length) {
        this.setState(function (prevState) {
          var oldHeights = prevState.heights.slice(0);
          var newHeights = new Array(newProps.children.length - _this2.state.heights.length).fill(newProps.defaultHeight || 345);
          return {
            heights: oldHeights.concat(newHeights)
          };
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children.map(function (child, i) {
        return _react2.default.createElement(
          _heightWrapper2.default,
          {
            key: 'hw_' + child.key,
            onHeightChange: function onHeightChange(newHeight) {
              return _this3.updateHeight(i, newHeight);
            }
          },
          child
        );
      });
      return _react2.default.createElement(
        _reactInfinite2.default,
        _extends({
          elementHeight: this.state.heights
        }, this.props),
        children
      );
    }
  }]);

  return InfiniteAutoHeight;
}(_react2.default.Component);

exports.default = InfiniteAutoHeight;