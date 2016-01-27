import chai from 'chai'
import jsxChai from 'jsx-chai'
import sinonChai from 'sinon-chai'

chai.config.includeStack = true
chai.use(jsxChai)
chai.use(sinonChai)

global.should = chai.should()