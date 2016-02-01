# React Injector

Dependency injection for React

### Installation

```javascript
$ npm install --save react-injector
```

### Getting Started

React Injector provides a root component that can easily be used to set up component injection in React. Begin by importing the ReactInjector component. This should only be done once.
```javascript
import { ReactInjector } from 'react-injector'
```
This can then be used to bootstrap your application.
```javascript
render((
    <ReactInjector>
        <YourApplicationRoot />
    </ReactInjector>
), document.getElementById("mount"))
```
That's it! Your application is now set up for dependency injection.

### Class Dependency Declaration
The easiest way set up dependencies is to leverage the `Inject` decorator provided by React Injector.
*Keep in mind that decorators are still experimental. In order to use decorators a library will need to be used for interpretation. Babel, for example, can be used alongside its `transform-decorators-legacy` plugin*

Let's start by declaring a class that we'll then inject as a dependency into another class.
```javascript
export default class AmazingDependency {
    getAmazingText() {
        return "World!"
    }
}
```

We'll then create the class that uses `AmazingDependency` as the dependency we'll inject.
```javascript
import { Inject } from 'react-injector'
import AmazingDependency from './AmazingDependency'

@Inject([ AmazingDependency ])
export default class Greeter {
    constructor(amazingDependency) {
        this.amazingDependency = amazingDependency
    }
    
    greet() {
        return "Hello, " + this.amazingDependency.getAmazingText()
    }
}
```
When we call the greet method on the class above it will return `Hello, World!`. Let's break down the above snippet. The `Inject` decorator takes an array of dependencies. These dependencies are then injected into the constructor when the class is instantiated.

The dependencies can actually be pretty much anything. Dependencies that are classes and happen to need their own injected dependencies also will be properly injected upon insertion into the constructor. Any other type will be directly translated into the constructor.

### Function Dependency Declaration
React Injector allows you to inject functions as dependencies as well. This can be done by specifying that a dependency is a function.

```javascript
import { Inject } from 'react-injector'

Inject({ type: 'function' })
export default function amazingFunction() {
    return "You just called an amazing function"
}
```

Functions can also be injected with dependencies. 
```javascript
import { Inject } from 'react-injector'
import AmazingDependency from './AmazingDependency'

Inject({ type: 'function' }, [ AmazingDependency ])
export default function greet(amazingDependency) {
    return () => {
        return "Hello, " + amazingDependency.getAmazingText()
    }
}
```
Notice that the above greet function is actually a wrapper around another function. The wrapper function is injected with the dependency and invoked by the container. This means that when injected you will actually recieve the inner function having access to the dependencies in scope. 

### React Component Injection
React components have their dependencies injected in a slightly different way. This is because React itself abstracts the instantiation of components. Due to this restraint dependencies are injected into a component's props.

Using our `AmazingDependency` from above let's set up a new component for injection.
```javascript
import { Inject } from 'react-injector'
import AmazingDependency from './AmazingDependency'

@Inject([ AmazingDependency ])
export default class GreeterComponent {
    render() {
        return <div>Hello, { this.props.AmazingDependency.getAmazingText() }</div>
    }
}
```
Rendering this component will display `Hello, World!` because the dependency was injected into the props object. Notice that the name on the props object matches the name of the dependency. This is by design. However, if you decide to uglify your code leveraging the `mangle` option the name of the dependency will change, but props will not be updated. To avoid this either don't use this option or change your code to access dependency props in a different way. Example:
```javascript
this.props[AmazingDependency.name].getAmazingText()
```

### Decorator Alternative
React Injector provides an alternative to `Inject` because decorators are still experimental. The `InjectDirect` function can be used in it's place.

Example:
```javascript
import { InjectDirect } from 'react-injector'

class DirectGreeter {
    constructor(amazingDependency) {
        this.amazingDependency = amazingDependency
    }
    
    greet() {
        return "Hello, " + this.amazingDependency.getAmazingText()
    }
}
InjectDirect(DirectGreeter, [ AmazingDependency ])

export default DirectGreeter
```

### Container
The internals of React Injector rely on a dependency injection container. This container can be accessed directly.
```javascript
import { Container } from 'react-injector'
```

Though the container is generally behind this scenes it can be used, if needed, for direct service location.
```javascript
Container.get(ThatOneDependency)
```
