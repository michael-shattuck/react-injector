'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactInjector = function (_Component) {
    _inherits(ReactInjector, _Component);

    function ReactInjector() {
        _classCallCheck(this, ReactInjector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactInjector).apply(this, arguments));
    }

    _createClass(ReactInjector, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;

            var props = _objectWithoutProperties(_props, ['children']);
            // TODO: error if no children

            var elements = undefined;
            if (Array.isArray(children)) {
                elements = children.map(function (child) {
                    return (0, _createElement2.default)(child.type);
                });
            } else {
                elements = (0, _createElement2.default)(children.type, props);
            }

            return _react2.default.createElement(
                'div',
                null,
                elements
            );
        }
    }]);

    return ReactInjector;
}(_react.Component);

exports.default = ReactInjector;
module.exports = exports['default'];