import React from 'react'
import PropTypes from 'prop-types'

import Api from './Api'

import GtmContext from './utils/GtmContext'
import loadScripts from './utils/scripts'

import PageView from './events/PageView'

export class GMT extends React.Component {

  static propTypes = {
    dataLayerName: PropTypes.string,
    dataLayer    : PropTypes.object,

    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,

    gtm: PropTypes.shape({
      id     : PropTypes.string,
      auth   : PropTypes.string,
      preview: PropTypes.string,
    }),

    settings: PropTypes.shape({
      sendPageView: PropTypes.bool,
      pageView    : PropTypes.object,
    }),
  }

  static defaultProps = {
    dataLayerName: 'dataLayer',
    dataLayer    : {},

    gtm: {
      id     : null,
      auth   : null,
      preview: null,
    },

    settings: {
      sendPageView: false,
      pageview    : null,
    },
  }

  api

  constructor(props) {
    super(props)

    this.api = new Api()
  }

  componentDidMount() {
    const { gtm, dataLayerName, dataLayer } = this.props

    if (gtm && gtm.id) {
      this.api.init(dataLayerName)
      this.api.setDataLayer(dataLayer)

      loadScripts(gtm, dataLayerName, () => {
        this.api.loaded()
      })
    }
  }

  getValue = () => ({ api: this.api })

  render() {
    const { children, settings: { sendPageView, pageView } } = this.props

    return (
      <GtmContext.Provider value={this.getValue()}>
        <React.Fragment>
          {sendPageView && (
            <PageView {...pageView} />
          )}

          {children}
        </React.Fragment>
      </GtmContext.Provider>
    )
  }

}

export default GMT
