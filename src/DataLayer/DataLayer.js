// @flow
import React from 'react'
import api from '../api'

export class DataLayer extends React.Component {

  constructor(props) {
    super(props)

    api.setDataLayer(props)
  }

  componentWillReceiveProps(nextProps) {
    api.setDataLayer(nextProps)
  }

  render() {
    return null
  }

}
