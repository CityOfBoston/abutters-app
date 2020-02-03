import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import buffer from '@turf/buffer';
// We can't import these server-side because they require "window"
const MapboxGeocoder = process.browser
  ? require('@mapbox/mapbox-gl-geocoder')
  : null;
const mapboxgl = process.browser ? require('mapbox-gl') : null;

// Despite using mapboxgl to render the map, we still use esri-leaflet to
// query to the layer
const { featureLayer } = process.browser ? require('esri-leaflet') : {};
const L = process.browser ? require('leaflet') : {};

const parcels_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/parcels/FeatureServer/0';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParcel: {},
      selectedParcelPID: '',
    };
  }

  componentDidMount() {
    // TODO: might not need this
    this.parcelFeatureLayer = featureLayer({
      url: parcels_url,
    });

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [-71.067449, 42.352568],
      zoom: 13,
      style: {
        version: 8,
        // Despite mapbox enabling vector basemaps, we use our own tiled
        // basemap service to keep with city styling and branding
        sources: {
          'esri-grey': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
          'cob-basemap': {
            type: 'raster',
            tiles: [
              'https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'esri-grey',
            type: 'raster',
            source: 'esri-grey',
            minzoom: 0,
            maxzoom: 24,
          },
          {
            id: 'cob-basemap',
            type: 'raster',
            source: 'cob-basemap',
            minzoom: 0,
            maxzoom: 24,
          },
        ],
      },
    });

    // In order to add a geocoder to our map, we need a mapbox access token.
    // We've stored that using environment variables inside our nextjs config file.
    const { publicRuntimeConfig } = getConfig();
    const accessToken = publicRuntimeConfig.MapboxAccessToken;

    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      flyTo: {
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 5, // make the flying faster
        curve: 1, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function(t) {
          return t;
        },
      },
      placeholder: 'Search for an address…',
      country: 'us',
      // We set a bounding box so that the geocoder only looks for
      // matches in and around Boston, MA.
      // We need the minX, minY, maxX, maxY in that order.
      bbox: [-71.216812, 42.226992, -70.986099, 42.395573],
      zoom: 19,
    });

    // We want the geocoder div to show up in the Filters component so we've added
    // a div there with the id "geocoder". Here we're appending the mapbox
    // geocoder we just set up to that div.
    document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));

    this.map.on('load', () => {
      // When the map loads, we load up the icon we're using for showing
      // geocoder results.
      this.map.loadImage(
        // should be this in prod '/capital-projects/static/red-waypoint.png',
        '/static/red-waypoint.png',
        (error, image) => {
          if (error)
            // eslint-disable-next-line no-console
            console.error(
              'Could not load red waypoint icon. Error message:',
              error
            );
          this.map.addImage('red-waypoint', image);
        }
      );

      // We add an empty geojson source and layer that we'll populate
      // with the results of the geocoding search when appropriate.
      this.map.addSource('geocoding-result-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.map.addLayer({
        id: 'geocoding-result',
        source: 'geocoding-result-point',
        type: 'symbol',
        layout: {
          'icon-image': 'red-waypoint',
          'icon-size': 0.25,
        },
      });

      // We add another empty geojson source for the buffer polygon.
      this.map.addSource('buffer', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.map.addLayer({
        id: 'bufferPoly',
        source: 'buffer',
        type: 'fill',
        paint: {
          'fill-color': 'blue',
          'fill-outline-color': '#091F2F',
          'fill-opacity': 0.7,
        },
      });

      // this.map.addSource('parcels', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [],
      //   },
      //   //data: `${parcels_url}/query?where=1%3D1&outFields=*&outSR=4326&returnExceededLimitFeatures=true&f=pgeojson`,
      // });

      // this.map.addSource('clickedParcel', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [],
      //   },
      //   //data: `${parcels_url}/query?where=1%3D1&outFields=*&outSR=4326&returnExceededLimitFeatures=true&f=pgeojson`,
      // });

      // this.map.addLayer({
      //   id: 'clickedParcelPoly',
      //   type: 'fill',
      //   source: 'clickedParcel',
      //   layout: {},
      //   paint: {
      //     'fill-color': 'pink',
      //   },
      //   minzoom: 15,
      //   maxzoom: 24,
      // });

      this.map.addSource('bufferParcels', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.map.addLayer({
        id: 'bufferParcelsLayer',
        type: 'fill',
        source: 'bufferParcels',
        layout: {},
        paint: {
          'fill-color': '#32a852',
        },
        minzoom: 0,
        maxzoom: 24,
      });

      // this.map.addLayer({
      //   id: 'parcels-polygon',
      //   type: 'fill',
      //   source: 'parcels',
      //   layout: {},
      //   paint: {
      //     'fill-color': '#7f32a8',
      //   },
      //   minzoom: 15,
      //   maxzoom: 24,
      // });

      // this.map.addLayer({
      //   id: 'parcels-line',
      //   type: 'line',
      //   source: 'parcels',
      //   layout: {},
      //   paint: {
      //     'line-color': '#091F2F',
      //   },
      //   minzoom: 15,
      //   maxzoom: 24,
      // });

      // Since we're using lines and polygons to represent the parcels, we want
      // features of all geometries to get highlighted when a user clicks on them,
      // we add two more layers: a highlight-line layer and a highlight-polygon layer.

      // All layers stary out as empty, we style them here then add
      // data to them when a user clicks on a feature.
      this.map.addSource('highlight-line', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.map.addLayer({
        id: 'highlight-line',
        source: 'highlight-line',
        type: 'line',
        paint: {
          'line-width': 6,
          'line-color': '#FB4D42',
        },
        layout: {
          'line-cap': 'round',
        },
      });

      this.map.addSource('highlight-polygon', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.map.addLayer({
        id: 'highlight-polygon',
        source: 'highlight-polygon',
        type: 'fill',
        paint: {
          'fill-color': '#FB4D42',
          'fill-outline-color': '#091F2F',
          'fill-opacity': 0.7,
        },
      });
    });

    geocoder.on('result', function(ev) {
      geocoder._map
        .getSource('geocoding-result-point')
        .setData(ev.result.geometry);
    });

    this.map.on('click', e => {
      // Parcels don't overlap eachother, so we can grab the first point
      // clicked on.
      //const feature = this.map.queryRenderedFeatures(e.point)[0];

      // When someone clicks on the map, we query the parcel layer for
      // which parcel they clicked on.
      this.parcelFeatureLayer
        .query()
        .contains(L.latLng(e.lngLat))
        .run((error, featureCollection) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return;
          }
          const selectedParcel = featureCollection.features[0];
          if (selectedParcel !== undefined) {
            console.log(selectedParcel);
            // highlight the selected parcel
            this.map
              .getSource('highlight-polygon')
              .setData(selectedParcel.geometry);

            // pass the PID to state
            this.props.handleParcelChange(selectedParcel.properties.PID_LONG);
            // make the selected parcel also state
            this.setState({
              selectedParcel: selectedParcel,
            });
          } else {
            return;
          }
        });

      // Update state

      //const clickedParcelURL = `${parcels_url}/query?where=&objectIds=&time=&geometry=${long}%2C+${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&resultType=standard&distance=0.0&units=esriSRUnit_Foot&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson`;
      //this.map.getSource('clickedParcel').setData(clickedParcelURL);

      //this.map.setLayoutProperty('highlight-line', 'visibility', 'none');
      //this.map.setLayoutProperty('highlight-polygon', 'visibility', 'none');

      // We don't want the red waypoint icon to highlight if a user clicks
      // on it, so we first check to make sure the user clicked on a feature
      // then we check to make sure that feature isn't the geocoding result.
      // The same goes for the highlight layers we've added.
      // if (
      //   feature &&
      //   feature.layer.id != 'geocoding-result' &&
      //   feature.layer.id != 'highlight-line' &&
      //   feature.layer.id != 'highlight-polygon'
      // ) {
      //   const coordinates = [e.lngLat.lng, e.lngLat.lat];
      //   // const highlightLayer =
      //   //   feature.layer.id == 'parcel-line'
      //   //     ? 'highlight-line'
      //   //     : 'highlight-polygon';
      //   //this.map.setLayoutProperty(highlightLayer, 'visibility', 'visible');

      //   new mapboxgl.Popup({ closeOnClick: true })
      //     .setLngLat(coordinates)
      //     .setHTML(
      //       `<div style="min-width: 280px; max-width: 500px;">
      //       ${feature.properties.PID_LONG}
      //       </div>`
      //     )
      //     .addTo(this.map);
      // } else {
      //   this.setState({ showTable: false });
      // }
    });

    // When we scroll over a point, change the mouse to a pointer.
    // this.map.on('mousemove', e => {
    //   const features = this.map.queryRenderedFeatures(e.point, {
    //     layers: ['parcels-polygon'],
    //   });

    //   features.length > 0
    //     ? (this.map.getCanvas().style.cursor = 'pointer')
    //     : (this.map.getCanvas().style.cursor = '');
    // });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bufferDistance !== this.props.bufferDistance) {
      const bufferDistanceFeet = this.props.bufferDistance * 0.000189393939;
      console.log({ bufferDistanceFeet });
      const bufferPoly = buffer(this.state.selectedParcel, bufferDistanceFeet, {
        unit: 'miles',
      });
      this.map.getSource('buffer').setData(bufferPoly.geometry);
      console.log(bufferPoly.geometry);

      this.parcelFeatureLayer
        .query()
        .intersects(bufferPoly.geometry)
        .run((error, featureCollection) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return;
          }
          console.log(featureCollection);
          this.map.getSource('bufferParcels').setData(featureCollection);
          // Set state
          this.props.handleBufferParcels(featureCollection.features);
        });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div>
        {/* make map take up entire viewport with room for the navbars */}
        <div
          style={{ height: 'calc(100vh - 125px)' }}
          ref={el => (this.mapContainer = el)}
        >
          <div style={{ zIndex: 1000, position: 'absolute' }}></div>
        </div>
      </div>
    );
  }
}

export default Map;

Map.propTypes = {
  handleParcelChange: PropTypes.func,
  selectedParcel: PropTypes.object,
  bufferDistance: PropTypes.number,
};
