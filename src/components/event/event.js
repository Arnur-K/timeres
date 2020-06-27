import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { database } from '../../store/firebase/firebase';
import './event.scss';

const UnitItem = ({ timerUnitNumber, timerUnitLabel }) => (
  <div className="event-item__unit-item">
    <p className="event-item__unit">{timerUnitNumber}</p>
    <p className="event-item__unit-label">{timerUnitLabel}</p>
  </div>
);

UnitItem.defaultProps = {
  timerUnitNumber: 0,
  timerUnitLabel: '',
};

UnitItem.propTypes = {
  timerUnitNumber: PropTypes.number,
  timerUnitLabel: PropTypes.string,
};

const unitsReducer = (currentUnits, action) => {
  switch (action.valueType) {
    case 'DAYS':
      return { ...currentUnits, days: action.value };
    case 'HOURS':
      return { ...currentUnits, hours: action.value };
    case 'MINUTES':
      return { ...currentUnits, minutes: action.value };
    case 'SECONDS':
      return { ...currentUnits, seconds: action.value };
    default:
      throw new Error('Should not get there');
  }
};

const Event = React.memo(
  ({
    userId,
    eventId,
    eventName,
    eventDate,
    eventTime,
    eventDateTimeInMs,
    eventAddress,
    eventDescription,
  }) => {
    const [countdownUnits, dispatch] = useReducer(unitsReducer, []);

    useEffect(() => {
      let now = moment();
      let countdown = moment(eventDateTimeInMs - now);

      let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((countdown % (1000 * 60)) / 1000);

      const timer = setInterval(() => {
        now = moment();
        countdown = moment(eventDateTimeInMs - now);

        days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        hours = Math.floor(
          (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        dispatch({ value: days, valueType: 'DAYS' });
        dispatch({ value: hours, valueType: 'HOURS' });
        dispatch({ value: minutes, valueType: 'MINUTES' });
        dispatch({ value: seconds, valueType: 'SECONDS' });

        if (countdown < 0) {
          clearInterval(timer);
          database().ref(`/users/${userId}/events/${eventId}`).remove();
          alert(`${eventName}${' has started! 🥳'}`);
          document.getElementById(eventId).style.display = 'none';
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);

    const { days, hours, minutes, seconds } = countdownUnits;

    const event = (
      <>
        <div id={eventId} className="event-item">
          <h2 className="event-item__title">{eventName}</h2>
          <p className="event-item__subtitle">Starts in</p>
          <div className="event-item__units-wrapper">
            <UnitItem timerUnitNumber={days} timerUnitLabel="days" />
            <UnitItem timerUnitNumber={hours} timerUnitLabel="hours" />
            <UnitItem timerUnitNumber={minutes} timerUnitLabel="minutes" />
            <UnitItem timerUnitNumber={seconds} timerUnitLabel="seconds" />
          </div>

          <p className="event-item__datetime">
            Date:{' '}
            <span
              style={{
                marginRight: '4rem',
              }}
            >
              {eventDate}
            </span>
            Time: <span>{eventTime}</span>
          </p>
          {eventAddress && (
            <>
              <p>Address:</p>
              <p className="event-item__address">
                <span>{eventAddress}</span>
              </p>
            </>
          )}

          {eventDescription && (
            <>
              <p
                style={{
                  color: '#d1d1e9',
                }}
              >
                Description:
              </p>
              <p className="event-item__description">
                <span>{eventDescription}</span>
              </p>
            </>
          )}
        </div>
      </>
    );

    return event;
  },
);

Event.defaultProps = {
  eventAddress: null,
  eventDescription: null,
};

Event.propTypes = {
  userId: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventTime: PropTypes.string.isRequired,
  eventDateTimeInMs: PropTypes.number.isRequired,
  eventAddress: PropTypes.string,
  eventDescription: PropTypes.string,
};

export default Event;
