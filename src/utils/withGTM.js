import React from 'react'
import GtmContext from './GtmContext'

export default () => Component => (
  <GtmContext.Consumer>
    {GTM => <Component GTM={GTM} />}
  </GtmContext.Consumer>
)
