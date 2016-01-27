'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isClass = function isClass(subject) {
    return typeof subject === 'function' && (/^\s*class\s+/.test(subject.toString()) || /_class\S+/i.test(subject.toString()));
};

var hasDependencies = function hasDependencies(subject) {
    return typeof subject.declareDependencies === 'function';
};

var injectClass = function injectClass(subject, dependencyHierarchy) {
    if (hasDependencies(subject)) {
        var dependencies = resolveDependencies(subject.declareDependencies(), dependencyHierarchy || [subject]);
        return new (Function.prototype.bind.apply(subject, [null].concat(_toConsumableArray(dependencies))))();
    } else {
        return new subject();
    }
};

var resolveFunction = function resolveFunction(subject, dependencyHierarchy) {
    if (hasDependencies(subject)) {
        var dependencies = resolveDependencies(subject.declareDependencies(), dependencyHierarchy || [subject]);
        return subject.apply(undefined, _toConsumableArray(dependencies));
    } else {
        return subject;
    }
};

var resolveDependencies = function resolveDependencies(dependencies, dependencyHierarchy) {
    if ((typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)) !== 'object') {
        throw 'Dependencies must be declared inside of an array';
    }

    var subjectDependencyHierarchy = undefined;
    var dependencyList = [];

    return dependencies.map(function (dependency) {
        if (typeof dependency !== 'function') {
            return dependency;
        }

        subjectDependencyHierarchy = [].concat(_toConsumableArray(dependencyHierarchy));

        if (dependencyList.includes(dependency)) {
            throw 'Duplicate dependency detected';
        } else {
            dependencyList.push(dependency);
        }

        if (subjectDependencyHierarchy.includes(dependency)) {
            throw 'Circular dependency detected';
        } else {
            subjectDependencyHierarchy.push(dependency);
        }

        return injectClass(dependency, subjectDependencyHierarchy);
    });
};

var Container = function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, null, [{
        key: 'get',
        value: function get(subject) {
            if (isClass(subject)) {
                return injectClass(subject);
            } else if (typeof subject === 'function') {
                return resolveFunction(subject);
            } else {
                return subject;
            }
        }
    }]);

    return Container;
}();

exports.default = Container;
module.exports = exports['default'];