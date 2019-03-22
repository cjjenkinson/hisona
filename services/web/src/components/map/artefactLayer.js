// @flow

import React from 'react'
import { Layer, Feature } from 'react-mapbox-gl'
import { svg } from './marker'

// Define layout to use in Layer component
const layoutLayer = { 'icon-image': 'hisonaMarker' }

// Create an image for the Layer
const image = new Image()
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg)
const images = ['hisonaMarker', image]

const ArtefactLayer = ({
  artefacts,
  onArtefactClick,
  markerHover,
  markerEndHover,
  artefactIds,
  layout,
}) => (
  <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
    {artefactIds.map(k => (
      <Feature
        onMouseEnter={markerHover.bind(null, k)}
        onMouseLeave={markerEndHover.bind(null, k)}
        onClick={onArtefactClick.bind(null, k)}
        coordinates={artefacts[k].latlng}
        key={k}
      />
    ))}
  </Layer>
)

export default ArtefactLayer
