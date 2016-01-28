import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import createElement from './createElement'

let injectChildren = (children) => {
    let elements
    if (Array.isArray(children)) {
        elements = children.map((child) => {
            const { ...props } = child.props
            return React.createElement.apply(React, [ child.type, { key: child.type.name, ...props }])
        })
    } else {
        const { ...props } = children.props
        return React.createElement.apply(React, [ children.type, { key: children.type.name, ...props }])
    }

    return elements
}

export default class ReactInjector extends Component {
    render() {
        React.uninjectedCreateElement = React.createElement
        React.createElement = createElement

        const { children } = this.props
        // TODO: error if no children
        // TODO: error if children not components

        return (
            <injectedContext>
                { injectChildren(children) }
            </injectedContext>
        )
    }
}
