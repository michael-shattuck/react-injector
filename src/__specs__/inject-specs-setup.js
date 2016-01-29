import Inject from '../Inject'

export class Dependency1 {}
export class Dependency2 {}

@Inject([ Dependency1, Dependency2 ])
export class DecoratorInjected {}

@Inject({ type: 'function' }, [ Dependency1 ])
export class DecoratorConfigInjected {}

export class Injected {
    say() {
        console.log("Hello")
    }
}

@Inject("bad")
export class IncorrectlyInjected {}

export function injectedFunction() {
    console.log("hello")
}
