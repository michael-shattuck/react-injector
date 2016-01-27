import {
    DecoratorInjected,
    IncorrectlyInjected,
    Injected,
    Dependency1,
    Dependency2,
    injectedFunction
} from './inject-specs-setup'
import { Inject } from '../Inject'

context('Inject decorator', function() {
    describe('When instantiating a class decorated with inject', function() {
        let subject
        let dependencies

        beforeEach(function() {
            subject = new DecoratorInjected()
            dependencies = subject.declareDependencies()
        })

        it('should create a dependencies function', () => subject.declareDependencies.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })

    describe('When instantiating a class decorated with inject and passing incorrect dependencies', function() {
        let exception

        beforeEach(function() {
            try {
                new IncorrectlyInjected().declareDependencies()
            } catch(e) {
                exception = e
            }
        })

        it('should throw an exception', () => exception.should.not.be.null)
        it('should throw the correct message', () => exception.should.equal('Invalid dependency declaration. Dependencies should be declare in an array'))
    })

    describe('When decorating a function with the Inject function', function() {
        let subject
        let dependencies

        beforeEach(function() {
            subject = Inject(injectedFunction, [ Dependency1, Dependency2 ])
            dependencies = subject.declareDependencies()
        })

        it('should create a dependencies function', () => subject.declareDependencies.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })

    describe('When decorating a class with the Inject function ', function() {
        let subject
        let dependencies

        beforeEach(function() {
            subject = Inject(Injected, [ Dependency1, Dependency2 ])
            dependencies = subject.declareDependencies()
        })

        it('should create a dependencies function', () => subject.declareDependencies.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })
})
