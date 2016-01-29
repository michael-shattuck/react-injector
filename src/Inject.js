let createDeclaration = (target, config, dependencies) => {
    if (!dependencies) {
        dependencies = config
        config = {}
    }

    target.prototype.__injectConfig__ = config
    target.prototype.__dependencies__ = () => {
        if (typeof dependencies !== 'object') {
            throw 'Invalid dependency declaration. Dependencies should be declare in an array'
        }

        return [...dependencies]
    }
}

export default (config, dependencies) => {
    return (target) => {
        createDeclaration(target, config, dependencies)
    }
}

export function InjectDirect(target, config, dependencies) {
    createDeclaration(target, config, dependencies)
    return target
}
