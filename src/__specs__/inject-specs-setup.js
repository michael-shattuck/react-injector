import Inject from '../Inject'

export class Dependency1 {}
export class Dependency2 {}

@Inject([ Dependency1, Dependency2 ])
export class DecoratorInjected {}

export class Injected {}

@Inject("bad")
export class IncorrectlyInjected {}

let injectedFunction = function() {}

export { injectedFunction }
