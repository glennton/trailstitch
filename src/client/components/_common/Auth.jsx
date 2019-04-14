//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { graphql } from "react-apollo";
import { withCookies, Cookies } from 'react-cookie';
import jwt from 'jsonwebtoken'

//UI Elements

//GraphQL Store
import SET_TOKEN from 'GraphQLStore/Login/SET_TOKEN';

//Utils

//Components


// export const validateToken = () => {
//   console.log('test')
// }

const setToken = (props) => {
  console.log('test', props)
}

const testHoc = graphql(SET_TOKEN)(props => {
  console.log(props)
})

// compose(
//   graphql(SET_TOKEN, { name: 'CREATE_USER' })
// )(setToken)

export default testHoc