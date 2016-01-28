import React from 'react'
import { render } from 'react-dom'
import { ReactInjector } from '../../src'
import InjectedComponent from './InjectedComponent'
import SecondInjectedComponent from './SecondInjectedComponent'

render((
    <ReactInjector>
        <InjectedComponent />
        <SecondInjectedComponent />
    </ReactInjector>
), document.getElementById("mount"))
