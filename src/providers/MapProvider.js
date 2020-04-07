import React from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'

const { createContext, useContext, useRef } = React

const MapContext = createContext(null)

export const MapProvider = ({ children, apiKey }) => {
  const cache = useRef({})

  const normalizeLocation = location => {
    return location.replace(/\s/g, '').toLowerCase()
  }

  const cacheLocation = (location, position) => {
    const locationKey = normalizeLocation(location)
    return (cache.current[locationKey] = position)
  }

  const getCachedLocation = location => {
    const locationKey = normalizeLocation(location)
    return cache.current[locationKey]
  }

  const initMap = () => {
    const map = tt.map({
      key: apiKey,
      container: 'rpn-map',
      style: 'tomtom://vector/1/basic-main',
      zoom: 10,
      scrollZoom: false,
    })

    return map
  }

  const setCenter = (map, position) => {
    map.setCenter(new tt.LngLat(position.lon, position.lat))
  }

  const addMarker = (map, position) => {
    const markerDiv = document.createElement('div')
    markerDiv.className = 'rpn-marker'

    new tt.Marker({ element: markerDiv })
      .setLngLat([position.lon, position.lat])
      .addTo(map)
  }

  const addPopupMessage = (map, message) => {
    new tt.Popup({
      className: 'rpn-popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map)
  }

  const locationNotFound = () => Promise.reject('Location not found.')

  const getGeoPosition = location => {
    const cachedPosition = getCachedLocation(location)

    return cachedPosition
      ? Promise.resolve(cachedPosition)
      : requestGeoLocation(location)
  }

  const requestGeoLocation = location => {
    return axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
      )
      .then(res => res.data)
      .then(tomRes => {
        const results = tomRes.results
        if (results && results.length > 0) {
          const { position } = results[0]
          cacheLocation(location, position)
          return position
        }
        return locationNotFound()
      })
      .catch(() => locationNotFound())
  }

  const mapApi = {
    initMap,
    getGeoPosition,
    setCenter,
    addMarker,
    addPopupMessage,
  }
  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>
}

export const useMap = () => {
  return useContext(MapContext)
}
