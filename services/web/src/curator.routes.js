import React from 'react'
import { Router } from '@reach/router'
import Loadable from 'react-loadable'
import Curators from './screens/Curators'
import Loading from './components/Loading'

const AsyncDashboard = Loadable({
  loader: () => import('./screens/Dashboard'),
  loading: Loading
})

const AsyncReports = Loadable({
  loader: () => import('./screens/Reports'),
  loading: Loading
})

const CuratorRoutes = () => (
  <Router>
    <Curators path="curators">
      <AsyncDashboard path="/" />
      <AsyncReports path="/reports" />
    </Curators>
  </Router>
)

export default CuratorRoutes
