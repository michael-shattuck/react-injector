import React from 'react'
import { Inject } from '../../src'
import SecondDependency from './SecondDependency'

@Inject([ SecondDependency ])
export default class SecondInjectedComponent extends React.Component
{
    render() {
        return <div>{ this.props.SecondDependency.getText() }</div>
    }
}
