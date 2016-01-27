import React from 'react'
import Container from './Container'

let isInjectable = (component) => {
    return typeof component.type.prototype.declareDependencies === 'function'
}

export default function createElement(component, props, children) {
    if (isInjectable(component)) {
        let injectedDependencyProps = {}
        component.type.prototype.declareDependencies().forEach((dependency) => {
            injectedDependencyProps[dependency.name] = Container.get(dependency)
        })

        return React.createElement(component, {...props, ...injectedDependencyProps}, children)
    } else {
        return React.createElement(component, props, children)
    }
}
