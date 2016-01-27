export class Dependency1 {}
export class Dependency2 {}
export class NoDependencies {}


export class SingleDependency {
    static declareDependencies()  { return [ Dependency1 ] };

    constructor(dependency) {
        this.dependency = dependency
    }
}
export class BadDependencies {
    static declareDependencies()  { return '' };
}

export class MultipleDependencies {
    static declareDependencies()  { return [ Dependency1, Dependency2 ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

export class PrimitiveDependencies {
    static declareDependencies()  { return [ 'a dependency', 123 ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

export class DeepDependencies {
    static declareDependencies()  { return [ SingleDependency ] };

    constructor(dependency) {
        this.dependency = dependency
    }
}

export class CircularDependencies {
    static declareDependencies()  { return [ CircularDependencies2 ] };
}

export class CircularDependencies2 {
    static declareDependencies()  { return [ CircularDependencies ] };
}

export class DuplicateDependencies {
    static declareDependencies()  { return [ Dependency1, Dependency1 ] };
}

export class SharedDependencies {
    static declareDependencies()  { return [ SingleDependency, MultipleDependencies ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}

let basicFunction = () => {
    return 'not a class'
}

let dependentFunction = (dependency) => {
    return dependency
}
dependentFunction.declareDependencies = () => { return [ Dependency1 ] }

export { basicFunction, dependentFunction }
