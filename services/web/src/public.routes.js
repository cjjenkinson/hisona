import React from 'react'
import { Router } from '@reach/router'
import Landing from './screens/pages/Landing'
import AboutPage from './screens/pages/AboutPage'
import ArtefactsPage from './screens/pages/ArtefactsPage'

const PublicRoutes = () => (
  <Router>
    <Landing path="/" />
    <AboutPage path="/about" />
    <ArtefactsPage path="/artefacts" />
  </Router>
)

export default PublicRoutes
