import Container from '../Container'
import {
  SingleDependency,
  MultipleDependencies,
  PrimitiveDependencies,
  DeepDependencies,
  NoDependencies,
  BadDependencies,
  CircularDependencies,
  DuplicateDependencies,
  SharedDependencies,
  basicFunction,
  basicConfiguredFunction,
  dependentFunction,
  configuredDependentFunction,
  Dependency1,
  Dependency2
} from './container-specs-setup'

context('Container:', function() {
    describe('When getting a class', function() {
        let subject

        before(function() {
            subject = Container.get(SingleDependency)
        })

        it('should return a SingleDependency class', () => subject.should.be.an.instanceof(SingleDependency))
    })

    describe('When getting class with a single dependency', function() {
        let subject

        before(function() {
            subject = Container.get(SingleDependency)
        })

        it('should inject the dependency', () => subject.dependency.should.be.an.instanceof(Dependency1))
    })

    describe('When getting a class with multiple dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(MultipleDependencies)
        })

        it('should inject the first dependency', () => subject.dependency1.should.be.an.instanceof(Dependency1))
        it('should inject the second dependency', () => subject.dependency2.should.be.an.instanceof(Dependency2))
    })

    describe('When getting a class with primitive dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(PrimitiveDependencies)
        })

        it('should inject the first dependency', () => subject.dependency1.should.equal('a dependency'))
        it('should inject the second dependency', () => subject.dependency2.should.equal(123))
    })

    describe('When getting a class that has not declared dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(NoDependencies)
        })

        it('should return a NoDependencies class', () => subject.should.be.an.instanceof(NoDependencies))
    })

    describe('When getting a class that has incorrectly declared dependencies', function() {
        let exception

        before(function() {
            try {
                Container.get(BadDependencies)
            } catch (e) {
                exception = e
            }
        })

        it('should throw an exception', () => exception.should.not.be.null)
        it('should throw a declaration error message', () => exception.should.equal('Dependencies must be declared inside of an array'))
    })

    describe('When getting a class with dependencies that have their own dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(DeepDependencies)
        })

        it('should inject the dependency', () => subject.dependency.should.be.an.instanceof(SingleDependency))
        it('should inject the dependencies of the dependency', () => subject.dependency.dependency.should.be.an.instanceof(Dependency1))
    })

    describe('When getting a class with dependencies that have shared dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(SharedDependencies)
        })

        it('should inject the first dependency', () => subject.dependency1.should.be.an.instanceof(SingleDependency))
        it('should inject the second dependency', () => subject.dependency2.should.be.an.instanceof(MultipleDependencies))
        it('should inject the shared dependency of first dependency', () => subject.dependency1.dependency.should.be.an.instanceof(Dependency1))
        it('should inject the shared dependency of second dependency', () => subject.dependency2.dependency1.should.be.an.instanceof(Dependency1))
    })

    describe('When getting a class with circular dependencies', function() {
        let exception

        before(function() {
            try {
                Container.get(CircularDependencies)
            } catch (e) {
                exception = e
            }
        })

        it('should throw an exception', () => exception.should.not.be.null)
        it('should throw a circular dependencies message', () => exception.should.equal('Circular dependency detected'))
    })

    describe('When getting a class with duplicate dependencies', function() {
        let exception

        before(function() {
            try {
                Container.get(DuplicateDependencies)
            } catch (e) {
                exception = e
            }
        })

        it('should throw an exception', () => exception.should.not.be.null)
        it('should throw a duplicate dependencies message', () => exception.should.equal('Duplicate dependency detected'))
    })

    describe('When getting a function with no dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(basicFunction)
        })

        it('should return a function', () => subject.should.be.a('function'))
        it('be invocable', () => subject().should.equal('not a class'))
    })

    describe('When getting a configured function with no dependencies', function() {
        let subject

        before(function() {
            subject = Container.get(basicFunction)
        })

        it('should return a function', () => subject.should.be.a('function'))
        it('be invocable', () => subject().should.equal('not a class'))
    })

    describe('When getting a function with dependencies', function() {
        let subject
        let message

        before(function() {
            subject = Container.get(dependentFunction)
            message = subject()
        })

        it('should return a function', () => subject.should.be.a('function'))
        it('should invoke the function and the dependency', () => message.should.be.instanceof(Dependency1))
    })

    describe('When getting a configured function with dependencies', function() {
        let subject
        let message

        before(function() {
            subject = Container.get(configuredDependentFunction)
            message = subject()
        })

        it('should return a function', () => subject.should.be.a('function'))
        it('should invoke the function and the dependency', () => message.should.be.instanceof(Dependency1))
    })
})
