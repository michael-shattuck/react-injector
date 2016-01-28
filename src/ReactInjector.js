import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import createElement from './createElement'

export default class ReactInjector extends Component {
    render() {
        const { children, ...props } = this.props
        // TODO: error if no children

        let elements
        if (Array.isArray(children)) {
            elements = children.map((child) => {
                return createElement(child.type)
            })
        } else {
            elements = createElement(children.type, props)
        }

        return (
            <div>
                { elements }
            </div>
        )
    }
}
