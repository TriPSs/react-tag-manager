import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'

import { GTMShape } from '../utils/types'
import withGTM from '../utils/withGTM'

export class PageView extends React.Component {

  static propTypes = {
    event: PropTypes.string,
    data : PropTypes.object,

    location: PropTypes.object.isRequired,

    settings: PropTypes.shape({
      locationProp: PropTypes.string,
      sendAs      : PropTypes.string,
    }),

    GTM: GTMShape.isRequired,
  }

  static defaultProps = {
    event: 'pageview',
    data : {},

    settings: {
      locationProp: 'pathname',
      sendAs      : 'url',
    },
  }

  sendPageView = false

  componentDidMount() {
    this.sendPageView = true
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname: newPathName } } = this.props
    const { location: { pathname: oldPathName } } = prevProps

    if (newPathName !== oldPathName) {
      this.sendPageView = true
    }
  }

  triggerPageView = () => {
    if (!this.sendPageView) {
      return
    }

    this.sendPageView = false

    const {
      data: eventData,
      event,
      GTM,
      location,
      settings,
    } = this.props

    let data = {
      ...eventData,
      [settings.sendAs]: location[settings.locationProp],
    }

    if (event && !data.event) {
      data.event = event
    }

    GTM.api.trigger(data)
  }

  render() {
    /**
     * We use Helmet's 'onChangeClientState' so we are sure the dom data is updated before sending the PageView
     */
    return (
      <Helmet onChangeClientState={() => this.triggerPageView()} />
    )
  }

}

export default withRouter(withGTM(PageView))
