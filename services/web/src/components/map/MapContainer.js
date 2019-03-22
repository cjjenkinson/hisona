// @flow

import React, { Component, Fragment } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import { MapEvent } from 'react-mapbox-gl/lib/map-events'
import { throttle } from 'lodash'
import HisonaMap from './map'

const defaultZoom = [6]
const defaultCenter = [-0.2416815, 51.5285582]

// const { createApolloFetch } = require('apollo-fetch');

// const fetch = createApolloFetch({
// 	uri: 'https://1jzxrj179.lp.gql.zone/graphql',
// });

// fetch({
// 	query: '{ posts { title }}',
// }).then(res => {
// 	console.log(res.data);
// });

// // You can also easily pass variables for dynamic arguments
// fetch({
// 	query: `query PostsForAuthor($id: Int!) {
//     author(id: $id) {
//       firstName
//       posts {
//         title
//         votes
//       }
//     }
//   }`,
// 	variables: { id: 1 },
// }).then(res => {
// apply normalization keyById transform with Ramda
// 	console.log(res.data);
// });

const artefacts = {
  '57f811a7-aaec-4290-98d0-473b10bbb7dd': {
    id: '57f811a7-aaec-4290-98d0-473b10bbb7dd',
    latitude: 52.095001220703125,
    longitude: -131.22027587890625,
    latlng: [-131.22027587890625, 52.095001220703125],
    location: 'Province of British Columbia',
    name: 'SGang Gwaay',
  },
}

class MapView extends Component {
  state = {
    hoveredItem: '',
    zoom: defaultZoom,
    center: defaultCenter,
    filteredArtefacts: [],
    bounds: [],
    hoveredAnchor: 'top',
  }

  // componentDidMount() {}

  mapInit = map => {
    const bounds = map.getBounds()
    const boundsArr = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()]

    // this.props.getArtefacts().then(() => {
    //   this.setArtefactsAndBounds(boundsArr)
    // })
    this.setArtefactsAndBounds(boundsArr)
  }

  setArtefactsAndBounds = bounds => {
    // const { artefacts } = this.props

    this.setState({
      filteredArtefacts: Object.keys(artefacts).filter(k => {
        const lat = artefacts[k].latitude
        const long = artefacts[k].longtitude

        return lat > bounds[0] && long > bounds[1] && lat < bounds[2] && long < bounds[3]
      }),
      bounds,
    })
  }

  BoundsChanged = throttle(
    map => {
      const bounds = map.getBounds()
      const limitedBounds = map.unproject([60, 60])

      const hDiff = Math.abs(bounds.getNorth() - limitedBounds.lat)
      const vDiff = Math.abs(bounds.getWest() - limitedBounds.lng)

      const boundsArr = [bounds.getSouth() + hDiff, limitedBounds.lng, limitedBounds.lat, bounds.getEast() - vDiff]

      this.setArtefactsAndBounds(boundsArr)
    },
    500,
    { leading: true },
  )

  onMouseEnter = key => {
    this.setState({
      hoveredItem: key,
    })
  }

  onMouseLeave = () => {
    this.setState({
      hoveredItem: '',
    })
  }

  onArtefactClick = k => {
    const selectedArtefact = artefacts[k]

    this.setState({
      center: selectedArtefact.latlng,
      zoom: [11],
    })

    // get artefact detail
    // route to detail view
  }

  render() {
    // const { artefacts } = this.props
    const { zoom, center, hoveredItem } = this.state

    return (
      <div>
        <HisonaMap
          zoom={zoom}
          center={center}
          hoveredItem={hoveredItem}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          artefacts={artefacts}
          BoundsChanged={this.BoundsChanged}
          mapInit={this.mapInit}
          onArtefactClick={this.onArtefactClick}
        />
      </div>
    )
  }
}

export default MapView
