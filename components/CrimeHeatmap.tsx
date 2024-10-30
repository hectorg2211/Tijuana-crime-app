import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const CrimeHeatmap = ({ crimeData }) => {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10', // Choose a Mapbox style
      center: [-116.886796, 32.510874], // Set initial center to Tijuana (or relevant city)
      zoom: 11,
      attributionControl: false,
    })

    map.on('load', () => {
      // Add crime data as a heatmap layer
      map.addSource('crimeData', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: crimeData.map(crime => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [crime.longitude, crime.latitude], // Replace with your coordinates
            },
            properties: {
              delito: crime.DELITO,
              clasificacion: crime['CLASIFICACION DEL DELITO'],
            },
          })),
        },
      })

      map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'crimeData',
        maxzoom: 15,
        paint: {
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 0, 15, 1],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(0, 0, 255, 0)',
            0.2,
            'rgba(0, 0, 255, 0.5)',
            0.4,
            'rgba(0, 255, 0, 0.7)',
            0.6,
            'rgba(255, 255, 0, 0.9)',
            1,
            'rgba(255, 0, 0, 1)',
          ],
          'heatmap-radius': 25,
          'heatmap-opacity': 0.8,
        },
      })
    })

    return () => map.remove()
  }, [crimeData])

  return <div ref={mapContainerRef} style={{ width: '800px', height: '600px' }} />
}

export default CrimeHeatmap
