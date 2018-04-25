import React from 'react'
import GtmContext from './GtmContext'

export default Component => React.forwardRef((props, ref) => (
  <GtmContext.Consumer>
    {GTM => <Component {...props} GTM={GTM} ref={ref} />}
  </GtmContext.Consumer>
))
