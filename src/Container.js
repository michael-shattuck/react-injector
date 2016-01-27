let isClass = (subject) => {
  return typeof subject === 'function' && (/^\s*class\s+/.test(subject.toString()) || /_class\S+/i.test(subject.toString()));
}

let hasDependencies = (subject) => {
    return typeof subject.declareDependencies === 'function'
}

let injectClass = (subject, dependencyHierarchy) => {
    if (hasDependencies(subject)) {
        let dependencies = resolveDependencies(subject.declareDependencies(), (dependencyHierarchy || [subject]))
        return new subject(...dependencies)
    } else {
        return new subject()
    }
}

let resolveFunction = (subject, dependencyHierarchy) => {
    if (hasDependencies(subject)) {
        let dependencies = resolveDependencies(subject.declareDependencies(), (dependencyHierarchy || [subject]))
        return subject(...dependencies)
    } else {
        return subject
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
        if (isClass(subject)) {
            return injectClass(subject)
        } else if (typeof subject === 'function') {
            return resolveFunction(subject)
        } else {
            return subject
        }
    }
}
