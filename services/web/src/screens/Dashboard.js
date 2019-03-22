import React from 'react'
import { Link } from '@reach/router'

const Dashboard = () => (
  <div className="container">
    <h2>User Dashboard</h2>
    <Link to="reports">Reports</Link>
  </div>
)

export default Dashboard
