'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createElement;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInjectable = function isInjectable(component) {
    return typeof component.prototype !== 'undefined' && typeof component.prototype.declareDependencies === 'function';
};

function createElement() {
    var args = Array.prototype.slice.call(arguments);
    var component = args[0];
    var props = args[1] = args[1] || {};

    if (isInjectable(component)) {
        var _ret = function () {
            var injectedDependencyProps = {};
            component.prototype.declareDependencies().forEach(function (dependency) {
                injectedDependencyProps[dependency.name] = _Container2.default.get(dependency);
            });

            args[1] = _extends({}, props, injectedDependencyProps);
            return {
                v: _react2.default.uninjectedCreateElement.apply(_react2.default, args)
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
        return _react2.default.uninjectedCreateElement.apply(_react2.default, args);
    }
}
module.exports = exports['default'];