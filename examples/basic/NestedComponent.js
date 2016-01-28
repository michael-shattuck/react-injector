import React from 'react'
import { Inject } from '../../src'
import SecondDependency from './SecondDependency'

@Inject([ SecondDependency ])
export default class NestedComponent extends React.Component
{
    render() {
        return <div>More: { this.props.SecondDependency.getText() }</div>
    }
}
