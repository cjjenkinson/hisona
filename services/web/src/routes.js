import React from 'react'
import { AuthProvider } from './helpers/AuthContext';
import PublicRoutes from './public.routes'
import CuratorRoutes from './curator.routes'

const Routes = () => (
  <React.Fragment>
    <AuthProvider>
      <PublicRoutes />
      <CuratorRoutes />
    </AuthProvider>
  </React.Fragment>
)

export default Routes


// import React from 'react'
// import { Router } from '@reach/router'
// import Loadable from 'react-loadable'
// import { AuthProvider } from './helpers/AuthContext';
// import Landing from './screens/Landing'
// import AboutPage from './screens/AboutPage'
// import Curators from './screens/Curators'
// import Loading from './components/Loading'
//
// const AsyncDashboard = Loadable({
//   loader: () => import('./screens/Dashboard'),
//   loading: Loading
// })
//
// const AsyncReports = Loadable({
//   loader: () => import('./screens/Reports'),
//   loading: Loading
// })
//
// const Routes = () => (
//   <div>
//     <AuthProvider>
//       <Router>
//
//         <Landing path="/" />
//         <AboutPage path="/about" />
//
//         <Curators path="curators">
//           <AsyncDashboard path="/" />
//           <AsyncReports path="/reports" />
//         </Curators>
//       </Router>
//     </AuthProvider>
//   </div>
// )
//
// export default Routes
