var Application = require('spectron').Application
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var path = require('path')

chai.should()
chai.use(chaiAsPromised)

describe('application launch', function () {
  beforeEach(function () {
    this.app = new Application({
      path: './node_modules/electron/dist/Electron.app/Contents/MacOS/Electron',
      args: ['./']
    })
    return this.app.start()
  })

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
  })

  it('has Tes App as a title', function () {
    return this.app.client.browserWindow.getTitle().should.eventually.equal('Test App')
  })

  it('has infos as div', function () {
    return this.app.client.isVisible('#infos').should.eventually.be.true
  })
})