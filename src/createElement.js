import React, { ReactElement } from 'react'
import Container from './Container'

let isInjectable = (component) => {
    return component.hasOwnProperty('prototype') && component.prototype.hasOwnProperty('__dependencies__')
}

export default function createElement() {
	let args = Array.prototype.slice.call(arguments)
	let component = args[0]
	let props = (args[1] = args[1] || {})

    if (isInjectable(component)) {
        let injectedDependencyProps = {}
        component.prototype.__dependencies__().forEach((dependency) => {
            injectedDependencyProps[dependency.name] = Container.get(dependency)
        })

        args[1] = {...props, ...injectedDependencyProps}
        return React.uninjectedCreateElement.apply(React, args)
    } else {
        return React.uninjectedCreateElement.apply(React, args)
    }
}
