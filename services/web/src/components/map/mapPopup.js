// @flow

import React from 'react'
import { Popup } from 'react-mapbox-gl'

const offset = [0, -8]

const MapPopup = ({ artefact }) => (
  <Popup
    coordinates={artefact.latlng}
    anchor="bottom"
    offset={offset}
  >
  <div className="">
    <h5>{artefact.name}</h5>
  </div>
  </Popup>
)

export default MapPopup
