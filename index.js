/**
 * @module reading-data-omit
 */

const OMIT = require('lodash.omit')

const ReadingDataOmit = (function () {
  return {
    /**
     * Configuration object providing a default configuration to be
     * used by ReadingData#use()
     * @type {Object}
     * @prop {String} scope='omit'    - The scope this plugin’s data should be saved under on the ReadingData instance.
     * @prop {String} hooks='process' - The hook on which this plugin should be called.
     * @prop {String|Array} omit      - The path(s) to omit from the original data object.
     */
    config: {
      scope: 'omit',
      hooks: 'process'
    },

    /**
     * Analyse a text node and add a node containing text statistics.
     * @param  {Object} pluginContext Context variables specific to this plugin.
     * @param  {Object} pluginContext.config This plugin’s configuration.
     * @param  {Object} pluginContext.data   Any data already stored by ReadingData under this plugin’s scope.
     * @param  {Object} context Contextual this passed from the ReadingData calling environment. Equivalent to the entire ReadingData instance.
     * @param  {Object} context.config Global configuration settings.
     * @param  {Object} context.data Data stored on the ReadingData instance.
     * @return {Object} Data to be stored by ReadingData under this plugin’s scope.
     */
    data: async function ({config, data}) {
      if (!config.hasOwnProperty('omit')) {
        throw new Error('ReadingDataOmit#data(): config doesn’t have an ‘omit’ property.')
      }
      return OMIT(data, config.omit)
    }
  }
}())

module.exports = ReadingDataOmit
