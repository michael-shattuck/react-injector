'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hasDependencies = function hasDependencies(subject) {
    return subject.hasOwnProperty('prototype') && ('__dependencies__' in subject || '__dependencies__' in subject.prototype);
};

var isClass = function isClass(subject) {
    if (subject.hasOwnProperty('prototype') && subject.prototype.hasOwnProperty('__injectConfig__')) {
        return subject.prototype.__injectConfig__.type !== 'function';
    } else {
        return typeof subject === 'function' && /^(?:class\s+|function\s+(?:_class|_default|[A-Z]))/.test(subject);
    }
};

var injectClass = function injectClass(subject, dependencyHierarchy) {
    if (hasDependencies(subject)) {
        var __dependencies__ = subject.__dependencies__ || subject.prototype.__dependencies__;
        var dependencies = resolveDependencies(__dependencies__(), dependencyHierarchy || [subject]);

        return isClass(subject) ? new (Function.prototype.bind.apply(subject, [null].concat(_toConsumableArray(dependencies))))() : subject.apply(undefined, _toConsumableArray(dependencies));
    } else {
        return isClass(subject) ? new subject() : subject;
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
            return injectClass(subject);
        }
    }]);

    return Container;
}();

exports.default = Container;
module.exports = exports['default'];