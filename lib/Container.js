export default class Container {
    static get(subject) {
        let dependencies = Container.resolve(subject.dependencies())
        return new subject(...dependencies)
    }

    static resolve(dependencies) {
        return dependencies.map((dependency) => {
            return new dependency()
        })
    }
}
