import React from 'react'
import { Inject } from '../../src'
import SecondDependency from './SecondDependency'
import NestedComponent from './NestedComponent'

@Inject([ SecondDependency ])
export default class SecondInjectedComponent extends React.Component
{
    render() {
        return (
            <div>
                <h2>Second injected component</h2>
                <NestedComponent />
                { this.props.SecondDependency.getText() }
            </div>
        )
    }
}
