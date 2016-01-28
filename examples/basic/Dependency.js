import DeepDependency from './DeepDependency'
import { Inject } from '../../src'

@Inject([ DeepDependency ])
export default class Dependency {
    constructor(deepDependency) {
        this.deepDependency = deepDependency
    }

    greet() {
        return this.deepDependency.greet() + " world"
    }
}
