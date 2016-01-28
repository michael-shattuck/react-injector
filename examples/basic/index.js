import React, { ReactElement } from 'react'
import { render } from 'react-dom'
import { Container, ReactInjector } from '../../src'
import InjectedComponent from './InjectedComponent'
import SecondInjectedComponent from './SecondInjectedComponent'

// let isInjectable = (component) => {
//     return typeof component.prototype !== 'undefined' && typeof component.prototype.declareDependencies === 'function'
// }
//
// let uninjectedCreateElement = React.createElement
// React.createElement = function(type, props, children) {
// 		var args = Array.prototype.slice.call(arguments),
// 			component = args[0],
// 			props = (args[1] = args[1] || {});
//
//     if (isInjectable(component)) {
//         let injectedDependencyProps = {}
//         component.prototype.declareDependencies().forEach((dependency) => {
//             injectedDependencyProps[dependency.name] = Container.get(dependency)
//         })
//
//         args[1] = {...props, ...injectedDependencyProps}
//         return uninjectedCreateElement.apply(React, args)
//     } else {
//         return uninjectedCreateElement.apply(React, args)
//     }
// }

render((
    <ReactInjector>
        <InjectedComponent />
        <SecondInjectedComponent />
    </ReactInjector>
), document.getElementById("mount"))
