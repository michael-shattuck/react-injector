'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var injectChildren = function injectChildren(children) {
    var elements = undefined;
    if (Array.isArray(children)) {
        elements = children.map(function (child) {
            var props = _objectWithoutProperties(child.props, []);

            return _react2.default.createElement.apply(_react2.default, [child.type, _extends({ key: child.type.name }, props)]);
        });
    } else {
        var props = _objectWithoutProperties(children.props, []);

        return _react2.default.createElement.apply(_react2.default, [children.type, _extends({ key: children.type.name }, props)]);
    }

    return elements;
};

var ReactInjector = function (_Component) {
    _inherits(ReactInjector, _Component);

    function ReactInjector() {
        _classCallCheck(this, ReactInjector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactInjector).apply(this, arguments));
    }

    _createClass(ReactInjector, [{
        key: 'render',
        value: function render() {
            _react2.default.uninjectedCreateElement = _react2.default.createElement;
            _react2.default.createElement = _createElement2.default;

            var children = this.props.children;
            // TODO: error if no children
            // TODO: error if children not components

            return _react2.default.createElement(
                'injectedContext',
                null,
                injectChildren(children)
            );
        }
    }]);

    return ReactInjector;
}(_react.Component);

exports.default = ReactInjector;
module.exports = exports['default'];