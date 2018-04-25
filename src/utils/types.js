import PropTypes from 'prop-types'

const { shape, func } = PropTypes

export const GTMShape = shape({
  api: shape({
    trigger     : func.isRequired,
    setDataLayer: func.isRequired,
  }).isRequired,
})
