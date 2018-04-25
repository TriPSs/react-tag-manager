import React from 'react'
import PropTypes from 'prop-types'

import { GTMShape } from '../utils/types'
import withGTM from '../utils/withGTM'

export class Click extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    event  : PropTypes.string,
    data   : PropTypes.object,

    GTM: GTMShape.isRequired,

    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    event  : null,
    data   : {},
    onClick: null,
  }

  handleOnClick = (e) => {
    const { data, event, onClick, GTM } = this.props

    if (event && !data.event) {
      data.event = event
    }

    GTM.api.trigger(data)

    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const {
      children,
      onClick,
      event,
      ...props
    } = this.props

    return (
      <React.Fragment>
        {React.Children.map(children, child => (
          React.cloneElement(child, {
              onClick: this.handleOnClick,
              ...props,
            },
          )
        ))}
      </React.Fragment>
    )
  }

}

export default withGTM(Click)
