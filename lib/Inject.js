'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Inject = Inject;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createDeclaration = function createDeclaration(target, dependencies) {
    target.declareDependencies = function () {
        if ((typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)) !== 'object') {
            throw 'Invalid dependency declaration. Dependencies should be declare in an array';
        }

        return [].concat(_toConsumableArray(dependencies));
    };
};

exports.default = function (dependencies) {
    return function (target) {
        createDeclaration(target.prototype, dependencies);
    };
};

function Inject(target, dependencies) {
    createDeclaration(target, dependencies);
    return target;
}