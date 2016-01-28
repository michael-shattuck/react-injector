import React from 'react'
import { Inject } from '../../src'
import Dependency from './Dependency'

@Inject([ Dependency ])
export default class InjectedComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Injected Component</h1>
                { this.props.Dependency.greet() }
                <hr />
            </div>
        )
    }
}
