import {
    DecoratorInjected,
    DecoratorConfigInjected,
    IncorrectlyInjected,
    Injected,
    Dependency1,
    Dependency2,
    injectedFunction
} from './inject-specs-setup'
import { InjectDirect } from '../Inject'

context('Inject Decorator:', function() {
    describe('When instantiating a class decorated with inject', function() {
        let subject
        let dependencies

        beforeEach(function() {
            subject = new DecoratorInjected()
            dependencies = subject.__dependencies__()
        })

        it('should create a dependencies function', () => subject.__dependencies__.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })

    describe('When instantiating a class decorated with inject and passing configuration', function() {
        let subject
        let dependencies

        beforeEach(function() {
            subject = new DecoratorConfigInjected()
            dependencies = subject.__dependencies__()
        })

        it('should create a dependencies function', () => subject.__dependencies__.should.be.a('function'))
        it('should contain the config', () => subject.__injectConfig__.type.should.equal('function'))
        it('should contain the dependency', () => dependencies[0].should.be.a('function'))
    })

    describe('When instantiating a class decorated with inject and passing incorrect dependencies', function() {
        let exception

        beforeEach(function() {
            try {
                new IncorrectlyInjected().__dependencies__()
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

        before(function() {
            subject = InjectDirect(injectedFunction, [ Dependency1, Dependency2 ])
            dependencies = subject.prototype.__dependencies__()
        })

        it('should create a dependencies function', () => subject.prototype.__dependencies__.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })

    describe('When decorating a class with the Inject function ', function() {
        let subject
        let dependencies

        before(function() {
            subject = InjectDirect(Injected, [ Dependency1, Dependency2 ])
            dependencies = subject.prototype.__dependencies__()
        })

        it('should create a dependencies function', () => subject.prototype.__dependencies__.should.be.a('function'))
        it('should contain the first dependency', () => dependencies[0].should.be.a('function'))
        it('should contain the second dependency', () => dependencies[1].should.be.a('function'))
    })
})
