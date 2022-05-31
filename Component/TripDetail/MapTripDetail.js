import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import global from '../../global'


const MapTripDetail = ({ xDepartSite, yDepartSite, xDestination, yDestination, departSite }) => {

    return (
        <MapView
            style={{
                flex: 1,
                position: 'absolute',
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
            }}
            mapType='mutedStandard'
            initialRegion={{
                latitudeDelta: 0.006,
                longitudeDelta: 0.006,
                latitude: xDepartSite,
                longitude: yDepartSite
            }}
        >
            <Marker
                coordinate={{
                    latitude: xDepartSite,
                    longitude: yDepartSite
                }}
                title={departSite}
                description={departSite}
            />

            {(xDestination && yDestination) ? (
                <MapViewDirections
                    origin={{
                        latitude: xDepartSite,
                        longitude: yDepartSite
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

export default MapTripDetail
