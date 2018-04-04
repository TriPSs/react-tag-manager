import debug from 'debug'

const warn = debug('gtm:api:warning')
const log = debug('gtm:api:log')

export default new class Api {

  dataLayerName

  gtm

  queue = []

  dataLayer = {}

  init = (dataLayerName) => {
    this.dataLayerName = dataLayerName
  }

  loaded = (gtm = null) => {
    this.gtm = gtm || window[this.dataLayerName]

    if (this.queue.length > 0) {
      this.queue.forEach(this.trigger)
    }
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

    } else {
      warn('"gtm" not loaded! Event added to the queue')
      this.queue.push(data)
    }
  }

}
