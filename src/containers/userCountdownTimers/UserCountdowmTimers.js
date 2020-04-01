import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData, toggleUserModal } from '../../store/actions/index';
import CountdownTimer from '../../components/countdownTimer/countdownTimer';

class UserCountdownTimers extends React.Component {
  componentDidMount() {
    const { onToggleUserModal, onGetData, userId } = this.props;
    onToggleUserModal();
    onGetData(userId);
  }

  render() {
    let content = null;
    const { events } = this.props;

    if (events === undefined || events === null) {
      content = (
        <p
          style={{
            marginTop: '5rem',
          }}
        >
          You don't have any countdown timers
        </p>
      );
    } else {
      content = Object.values(events).map((event) => (
        <CountdownTimer
          key={event.id}
          eventId={event.id}
          eventName={event.name}
          eventDate={event.date}
          eventTime={event.time}
          eventDateTimeInMs={event.dateTimeInMs}
          eventAddress={event.address}
          eventDescription={event.description}
          userId={this.props.userId}
        />
      ));
    }

    return <section className="section-user-cdt">{content}</section>;
  }
}

const mapStateToProps = (state) => ({
  events: state.userCdt.events,
  userId: state.auth.user.uid,
});

const mapDispatchToProps = (dispatch) => ({
  onGetData: (userId) => dispatch(getData(userId)),
  onToggleUserModal: () => dispatch(toggleUserModal()),
});

UserCountdownTimers.propTypes = {
  events: PropTypes.object,
  userId: PropTypes.string,
  onGetData: PropTypes.func.isRequired,
  onToggleUserModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCountdownTimers);
