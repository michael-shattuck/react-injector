let hasDependencies = (subject) => {
    return subject.hasOwnProperty('prototype') && ('__dependencies__' in subject || '__dependencies__' in subject.prototype)
}

let isClass = (subject) => {
    if (subject.hasOwnProperty('prototype') && subject.prototype.hasOwnProperty('__injectConfig__')) {
        return subject.prototype.__injectConfig__.type !== 'function'
    } else {
        return typeof subject === 'function' && /^(?:class\s+|function\s+(?:_class|_default|[A-Z]))/.test(subject);
    }
}

let injectClass = (subject, dependencyHierarchy) => {
    if (hasDependencies(subject)) {
        let __dependencies__ = subject.__dependencies__ || subject.prototype.__dependencies__
        let dependencies = resolveDependencies(__dependencies__(), (dependencyHierarchy || [subject]))

        return isClass(subject) ? new subject(...dependencies) : subject(...dependencies)
    } else {
        return isClass(subject) ? new subject() : subject
    }
}

let resolveDependencies = (dependencies, dependencyHierarchy) => {
    if (typeof dependencies !== 'object') {
        throw 'Dependencies must be declared inside of an array'
    }

    let subjectDependencyHierarchy
    let dependencyList = []

    return dependencies.map((dependency) => {
        if (typeof dependency !== 'function') {
            return dependency
        }

        subjectDependencyHierarchy = [...dependencyHierarchy]

        if (dependencyList.includes(dependency)) {
            throw 'Duplicate dependency detected'
        } else {
            dependencyList.push(dependency)
        }

        if (subjectDependencyHierarchy.includes(dependency)) {
            throw 'Circular dependency detected'
        } else {
            subjectDependencyHierarchy.push(dependency)
        }

        return injectClass(dependency, subjectDependencyHierarchy)
    })
}

export default class Container {
    static get(subject) {
        return injectClass(subject)
    }
}
