// @flow

import React, { Component, Fragment } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import { MapEvent } from 'react-mapbox-gl/lib/map-events'
import MapPopup from './mapPopup'
import ArtefactLayer from './artefactLayer'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGlzb25hZ2xvYmFsIiwiYSI6ImNqZHhkM2p1dTBsNzAzM282aDQ0OWEyZXMifQ.Mii7pTnNBhDNmfjVCqn3Kg',
})

const mapStyle = 'mapbox://styles/hisonaglobal/cjhn926yr21102smd0jre260m'

class HisonaMap extends Component {
  markerHover = (key, { map }) => {
    map.getCanvas().style.cursor = 'pointer'
    this.props.onMouseEnter(key)
  }

  markerEndHover = (key, { map }) => {
    map.getCanvas().style.cursor = ''
    this.props.onMouseLeave()
  }

  render() {
    const {
      artefacts,
      BoundsChanged,
      mapInit,
      center,
      zoom,
      hoveredItem,
      onArtefactClick,
    } = this.props

    const artefactIds = Object.keys(artefacts)

    return (
      <Fragment>
        <Map
          zoom={zoom}
          center={center}
          style={mapStyle}
          containerStyle={{
            height: '100vh',
            position: 'absolute',
            left: 500,
            right: 0,
            bottom: 0,
            top: 0,
          }}
          onZoom={BoundsChanged}
          onStyleLoad={mapInit}
          onMove={BoundsChanged}
        >
          {!!hoveredItem ? (
            <MapPopup artefact={artefacts[hoveredItem]} />
          ) : null}
          <ArtefactLayer
            onArtefactClick={onArtefactClick}
            artefacts={artefacts}
            artefactIds={artefactIds}
            layout={{ 'icon-image': 'hisona-marker' }}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
        </Map>
      </Fragment>
    )
  }
}

export default HisonaMap
