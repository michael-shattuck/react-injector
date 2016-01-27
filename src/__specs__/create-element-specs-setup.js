import React from 'react'
import Inject from '../Inject'

export class Dependency1 {
    say() {
        return "cheese!"
    }
}

@Inject([ Dependency1 ])
export class DeepDependency {
    constructor(dependency1) {
        this.dependency1 = dependency1
    }

    say() {
        return "say " + this.dependency1.say()
    }
}

export class NonInjectableComponent extends React.Component {
    render() {
        return <div>I am a non-injectable component!</div>
    }
}


@Inject([ Dependency1 ])
export class InjectableComponent extends React.Component {
    render() {
        return <div>I am an injectable component!</div>
    }
}

@Inject([ DeepDependency ])
export class DeepInjectableComponent extends React.Component {
    render() {
        return <div>I am an deep injectable component!</div>
    }
}
