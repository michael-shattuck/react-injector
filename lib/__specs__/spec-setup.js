export class Dependency1 {}
export class Dependency2 {}

export class SingleDependency {
    static dependencies()  { return [ Dependency1 ] };

    constructor(dependency) {
        this.dependency = dependency
    }
}

export class MultipleDependencies {
    static dependencies()  { return [ Dependency1, Dependency2 ] };

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1
        this.dependency2 = dependency2
    }
}
