import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

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

    GTM: PropTypes.shape({
      api: PropTypes.shape({
        trigger: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    event: 'pageview',
    data : {},

    settings: {
      locationProp: 'pathName',
      sendAs      : 'url',
    },
  }

  componentDidMount() {
    this.sendPageView()
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname: newPathName } } = this.props
    const { location: { pathname: oldPathName } } = prevProps

    if (newPathName !== oldPathName) {
      this.sendPageView()
    }
  }

  sendPageView = () => {
    const { data: eventData, event, GTM, location, settings } = this.props

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
    return null
  }

}

export default withRouter(withGTM(PageView))
