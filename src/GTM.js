import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Api from './Api'

import GtmContext from './utils/GtmContext'
import loadScripts from './utils/scripts'

import PageView from './events/PageView'

export class GMT extends React.Component {

  static propTypes = {
    dataLayerName: PropTypes.string,
    dataLayer    : PropTypes.object,

    children: PropTypes.oneOf([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,

    gtm: PropTypes.shape({
      id     : PropTypes.string.isRequired,
      auth   : PropTypes.string,
      preview: PropTypes.string,
    }).isRequired,

    settings: {
      withPageView: PropTypes.bool,
      pageView    : PropTypes.object,
    },
  }

  static defaultProps = {
    dataLayerName: 'dataLayer',
    dataLayer    : {},

    gtm: {
      auth   : null,
      preview: null,
    },

    settings: {
      withPageView: false,
      pageview    : {},
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
    const { children, settings: { withPageView, pageView } } = this.props

    return (
      <GtmContext.Provider value={this.getValue()}>
        {withPageView && (
          <PageView {...pageView} />
        )}

        {children}
      </GtmContext.Provider>
    )
  }

}

export default withRouter(GMT)
