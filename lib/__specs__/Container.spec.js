import Container from '../Container'
import { SingleDependency, MultipleDependencies, Dependency1, Dependency2 } from './spec-setup'

context('Container', function() {
    describe('When successfully getting a class', function() {
        let subject

        before(function() {
            subject = Container.get(SingleDependency)
        })

        it('should return a SingleDependency class', () => subject.should.be.an.instanceof(SingleDependency))
    })

    describe('When successfully injecting a single dependency into a class', function() {
        let subject

        before(function() {
            subject = Container.get(SingleDependency)
        })

        it('should inject the dependency', () => subject.dependency.should.be.an.instanceof(Dependency1))
    })

    describe('When successfully injecting multiple dependencies into a class', function() {
        let subject

        before(function() {
            subject = Container.get(MultipleDependencies)
        })

        it('should inject the first dependency', () => subject.dependency1.should.be.an.instanceof(Dependency1))
        it('should inject the second dependency', () => subject.dependency2.should.be.an.instanceof(Dependency2))
    })
})
