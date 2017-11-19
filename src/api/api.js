import debug from 'debug'

const warn = debug('gtm:api:warning')
const log = debug('gtm:api:log')

export default new (class {

  dataLayerName

  gtm

  queue = []

  dataLayer = {}

  init = (dataLayerName) => {
    this.dataLayerName = dataLayerName
  }

  loaded = (gtm = null) => {
    this.gtm = gtm || window[this.dataLayerName]
  }

  setDataLayer = (data) => {
    this.dataLayer = {
      ...this.dataLayer,
      ...data,
    }
  }

  trigger = (data) => {
    if (this.gtm) {
      const eventData = {
        ...this.dataLayer,
        ...data,
      }

      this.gtm.push(eventData)

      log('Event triggered', { ...eventData })
    }
  }

})()
