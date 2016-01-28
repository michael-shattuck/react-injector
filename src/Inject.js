let createDeclaration = (target, dependencies) => {
    target.declareDependencies = () => {
        if (typeof dependencies !== 'object') {
            throw 'Invalid dependency declaration. Dependencies should be declare in an array'
        }

        return [...dependencies]
    }
}

export default (dependencies) => {
    return (target) => {
        createDeclaration(target.prototype, dependencies)
        if (typeof target.type === 'function') {
            createDeclaration(target.prototype, dependencies)
        }
    }
}

export function InjectDirect(target, dependencies) {
    createDeclaration(target, dependencies)
    return target
}
