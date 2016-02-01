'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InjectDirect = InjectDirect;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createDeclaration = function createDeclaration(target, config, dependencies) {
    if (!dependencies) {
        dependencies = config;
        config = {};
    }

    target.prototype.__injectConfig__ = config;
    target.prototype.__dependencies__ = function () {
        if ((typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)) !== 'object') {
            throw 'Invalid dependency declaration. Dependencies should be declare in an array';
        }

        return [].concat(_toConsumableArray(dependencies));
    };
};

exports.default = function (config, dependencies) {
    return function (target) {
        createDeclaration(target, config, dependencies);
    };
};

function InjectDirect(target, config, dependencies) {
    createDeclaration(target, config, dependencies);
    return target;
}