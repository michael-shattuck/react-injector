export class Dependency1 {
    greet() {
        return "Hello world"
    }
}

export class Dependency2 {
    greet() {
        return "Hello world"
    }
}

export class NoDependencies {
    greet() {
        return "Hello world"
    }
}

export class SingleDependency {
    static __dependencies__()  { return [ Dependency1 ] };

    constructor(dependency) {
        this.dependency = dependency
    }
}
export class BadDependencies {
    static __dependencies__()  { return '' };
}

export class MultipleDependencies {
    static __dependencies__()  { return [ Dependency1, Dependency2 ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

export class PrimitiveDependencies {
    static __dependencies__()  { return [ 'a dependency', 123 ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

export class DeepDependencies {
    static __dependencies__()  { return [ SingleDependency ] };

    constructor(dependency) {
        this.dependency = dependency
    }
}

export class CircularDependencies {
    static __dependencies__()  { return [ CircularDependencies2 ] };
}

export class CircularDependencies2 {
    static __dependencies__()  { return [ CircularDependencies ] };
}

export class DuplicateDependencies {
    static __dependencies__()  { return [ Dependency1, Dependency1 ] };
}

export class SharedDependencies {
    static __dependencies__()  { return [ SingleDependency, MultipleDependencies ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

let basicFunction = () => {
    return 'not a class'
}

let basicConfiguredFunction = () => {
    return 'not a class'
}
basicConfiguredFunction.prototype.__injectConfig__ = { type: 'function' }

let dependentFunction = (dependency) => {
    return () => {
        return dependency
    }
}
dependentFunction.prototype.__dependencies__ = () => { return [ Dependency1 ] }


let configuredDependentFunction = (dependency) => {
    return () => {
        return dependency
    }
}
configuredDependentFunction.prototype.__dependencies__ = () => { return [ Dependency1 ] }
configuredDependentFunction.prototype.__injectConfig__ = { type: 'function' }

export { basicFunction, basicConfiguredFunction, dependentFunction, configuredDependentFunction }
