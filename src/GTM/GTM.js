// @flow
import React from 'react'
import type { Children } from 'react'
import { withRouter } from 'react-router'

import api from '../api'
import loadScripts from '../utils/scripts'

export type PropsType = {

  dataLayerName: string,
  dataLayer?: Object,
  pageviewEvent: string,

  children: Children,

  gtm: {
    id: string,
    auth?: string,
    preview?: string,
  }
}

export class GMT extends React.Component {

  static defaultProps = {
    pageviewEvent: 'pageview',
    dataLayerName: 'dataLayer',
  }

  componentDidMount() {
    const { gtm, dataLayerName, dataLayer, pageviewEvent } = this.props
    
    if (gtm && gtm.id) {
      api.init(dataLayerName)
      api.setDataLayer(dataLayer)

      loadScripts(gtm, dataLayerName, () => {
        const { location: { pathname } } = this.props

        api.loaded()

        api.trigger({
          event: pageviewEvent,
          url  : pathname,
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname: newPathName }, pageviewEvent } = nextProps
    const { location: { pathname: oldPathName } } = this.props

    if (newPathName !== oldPathName) {
      api.trigger({
        event: pageviewEvent,
        url  : newPathName,
      })
    }
  }

  render() {
    return null
  }

}

export default withRouter(GMT)
