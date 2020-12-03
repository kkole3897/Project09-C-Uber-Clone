import React, { useState, useEffect } from 'react';

import { useSubscription } from '@apollo/client';

import { matchedDriverState } from '../../queries/rider';

import PickUpMap from '../containers/PickUpMap';
import DriverInfoBox from '../containers/DriverInfoBox';

const INIT_POS = {
  lat: 34.047,
  lng: -118.249,
};

export default function RiderPickUpForm() {
  const { loading, error, data } = useSubscription(matchedDriverState);
  const [riderPos, setRiderPos] = useState(INIT_POS);

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setRiderPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
  }, []);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>드라이버 위치정보를 불러오는 중입니다</p>;
  }
  return (
    <>
      <PickUpMap
        isRider={true}
        riderLat={riderPos.lat}
        riderLng={riderPos.lng}
        driverLat={data.matchedDriverState.driverPosition.lat}
        driverLng={data.matchedDriverState.driverPosition.lng}
        pickUpLat={35.689487}
        pickUpLng={139.691706}
      />
      <DriverInfoBox />
    </>
  );
}
