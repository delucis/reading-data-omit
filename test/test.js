'use strict'

const DESCRIBE = require('mocha').describe
const BEFORE_EACH = require('mocha').beforeEach
const IT = require('mocha').it
const EXPECT = require('chai').expect
const READING_DATA = require('@delucis/reading-data')
const RDOmit = require('../index')

BEFORE_EACH(function () {
  READING_DATA.uninstall()
  READING_DATA.clean()
})

DESCRIBE('ReadingDataOmit', function () {
  IT('should be an object', function () {
    EXPECT(RDOmit).to.be.an('object')
  })

  IT('should have a config object', function () {
    EXPECT(RDOmit).to.have.property('config')
    EXPECT(RDOmit.config).to.be.an('object')
  })

  IT('should have a data method', function () {
    EXPECT(RDOmit).to.have.property('data')
    EXPECT(RDOmit.data).to.be.a('function')
  })

  IT('should throw an error if there is no omit property in config', async function () {
    READING_DATA.use(RDOmit)
    try {
      await READING_DATA.run()
    } catch (e) {
      EXPECT(e).to.be.an('error')
    }
  })

  IT('should omit a passed path that is a string', async function () {
    let testScope = 'fascinatingObject'
    let testObject = {
      string: 'This is a short article that needs analysing.',
      number: 75,
      boolean: true
    }
    let testPath = 'string'

    READING_DATA.preloadData({
      [testScope]: testObject
    })

    READING_DATA.use(RDOmit, {
      scope: testScope,
      omit: testPath
    })

    await READING_DATA.run()

    let output = READING_DATA.data[testScope]

    EXPECT(output).to.not.have.property(testPath)
    EXPECT(output).to.have.property('number')
    EXPECT(output.number).to.equal(75)
    EXPECT(output).to.have.property('boolean')
    EXPECT(output.boolean).to.be.true
  })

  IT('should omit a passed path that is an array', async function () {
    let testScope = 'fascinatingObject'
    let testObject = {
      string: 'This is a short article that needs analysing.',
      number: 75,
      boolean: true
    }
    let testPath = ['string', 'boolean']

    READING_DATA.preloadData({
      [testScope]: testObject
    })

    READING_DATA.use(RDOmit, {
      scope: testScope,
      omit: testPath
    })

    await READING_DATA.run()

    let output = READING_DATA.data[testScope]

    EXPECT(output).to.not.have.property(testPath[0])
    EXPECT(output).to.not.have.property(testPath[1])
    EXPECT(output).to.have.property('number')
    EXPECT(output.number).to.equal(75)
  })
})
