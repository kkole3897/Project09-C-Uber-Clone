import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useMutation } from '@apollo/client';

import { selectTripReducer } from '../../slices/tripSlice';

import styled from 'styled-components';

import { ADD_TRIP_STATUS } from '../../queries/trip';
import { NOTIFY_DRIVER_STATE } from '../../queries/driver';
import { useHistory } from 'react-router-dom';

const Modal = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 20px;
  background-color: white;
`;

const RiderName = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const PlaceInfo = styled.div`
  margin: 24px 0;
  padding: 8px 0;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  text-align: center;
  color: gray;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PickUpButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const ChatButton = styled.button`
    width: 45%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

const DropButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

function RiderInfoBox({ onBoard }:{onBoard:boolean}) {
  const history = useHistory();

  const { trip } = useSelector(selectTripReducer);
  const [setTripStatus, { data }] = useMutation(ADD_TRIP_STATUS);
  const [notifyDriverState] = useMutation(NOTIFY_DRIVER_STATE);

  const handleOnClickBoardCompelete = () => {
    const tripId = trip.id;
    setTripStatus({ variables: { tripId: tripId, newTripStatus: 'onBoard' } });
  };

  const handleOnClickDrop = () => {
    //TODO: 라이더 하차 버튼 이벤트
  };

  useEffect(() => {
    if (data && data.setTripStatus.result === 'success') {
      notifyDriverState({ variables: { tripId: trip.id, onBoard: true } });
      history.push('/driver/driving');
    }
  }, [data]);

  return (
    <>
      <Modal>
        <RiderName>라이더 이름</RiderName>
        <PlaceInfo>픽업 위치 or 도착 위치</PlaceInfo>
        {onBoard ?
          <DropButton onClick={handleOnClickDrop}>라이더 하차</DropButton>
          :
          <Buttons>
            <PickUpButton onClick={handleOnClickBoardCompelete}>탑승완료</PickUpButton>
            <ChatButton>채팅하기</ChatButton>
          </Buttons>
        }

      </Modal>
    </>
  );
}

export default RiderInfoBox;
