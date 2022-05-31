import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useSelector } from 'react-redux'
import global from '../../global'
import { locationSelector } from '../../Redux/locationSlices'


const MapDestination = () => {
    const xDepartSite = useSelector((state) => state.location.xDepartSite);
    const yDepartSite = useSelector((state) => state.location.yDepartSite);
    const xDestination = useSelector((state) => state.location.xDestination);
    const yDestination = useSelector((state) => state.location.yDestination);
    const departSite = useSelector((state) => state.location.departSite);
    const destination = useSelector((state) => state.location.destination);

    const mapRef = useRef(null);
    return (
        <MapView
            // ref={mapRef}
            style={{ flex: 1 }}
            mapType='mutedStandard'
            initialRegion={{
                latitudeDelta: 0.006,
                longitudeDelta: 0.006,
                latitude: xDepartSite,
                longitude: yDepartSite
                // latitude: 10.8486375,
                // longitude: 106.7856918
            }}
        >
            <Marker
                coordinate={{
                    latitude: xDepartSite,
                    longitude: yDepartSite
                    // latitude: 10.8486375,
                    // longitude: 106.7856918
                }}
                title={departSite}
                description={departSite}
            />

            {(xDestination && yDestination) ? (
                <MapViewDirections
                    origin={{
                        latitude: xDepartSite,
                        longitude: yDepartSite
                        // latitude: 10.8486375,
                        // longitude: 106.7856918
                    }}
                    destination={{
                        latitude: xDestination,
                        longitude: yDestination
                    }}
                    apikey={global.keyMap}
                    strokeColor='blue'
                    strokeWidth={3}
                    mode='DRIVING'
                />
            ) : null}
        </MapView>



    )
}

export default MapDestination
