import React from 'react'
import PropTypes from 'prop-types'

import withGTM from './utils/withGTM'

export class DataLayer extends React.Component {

  static propTypes = {
    GTM: PropTypes.shape({
      api: PropTypes.shape({
        setDataLayer: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,

    settings: PropTypes.shape({
      passProps: PropTypes.bool,
      withGTM  : PropTypes.bool,
    }),

    children: PropTypes.oneOf([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  static defaultProps = {
    settings: {
      passProps: false,
      withGTM  : false,
    },

    children: null,
  }

  constructor(props) {
    super(props)

    this.updateDataLayer()
  }

  componentDidUpdate() {
    this.updateDataLayer()
  }

  updateDataLayer = () => {
    const { GTM, ...data } = props

    GTM.api.setDataLayer(data)
  }

  render() {
    const {
      GTM,
      settings,
      children,
      settings: {
        passProps,
        withGTM,
      },
      ...rest
    } = this.props

    if (!passProps) {
      return children
    }

    let props = {
      ...rest,
    }

    if (withGTM) props.GTM = GTM

    return (
      <React.Fragment>
        {children && React.Children.map(children, child => (
          React.cloneElement(child, props)
        ))}
      </React.Fragment>
    )
  }

}

export default withGTM(DataLayer)
