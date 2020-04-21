import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleUserModal } from '../../store/actions/index';
import Event from '../../components/event/event';
import './userEvents.scss';

class UserEvents extends React.Component {
  componentDidMount() {
    const { onToggleUserModal } = this.props;

    onToggleUserModal();
  }

  render() {
    let content = null;
    const { events, lang, userId } = this.props;

    if (events !== undefined && events !== null) {
      content = Object.values(events).map((event) => (
        <Event
          key={event.id}
          eventId={event.id}
          eventName={event.name}
          eventDate={event.date}
          eventTime={event.time}
          eventDateTimeInMs={event.dateTimeInMs}
          eventAddress={event.address}
          eventDescription={event.description}
          userId={userId}
          lang={lang}
        />
      ));
    }

    return (
      <section className="section-user-events">
        {events === undefined || events === null ? (
          <h1 className="section-user-events__title">
            {lang === 'en'
              ? "You don't have any events"
              : 'У Вас нету никаких событий'}
          </h1>
        ) : null}
        <div className="section-user-events__events">{content}</div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.userEvents.events,
  userId: state.auth.user !== null ? state.auth.user.uid : null,
  lang: state.ui.lang,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleUserModal: () => dispatch(toggleUserModal()),
});

UserEvents.defaultProps = {
  events: {},
  userId: null,
  lang: 'en',
};

UserEvents.propTypes = {
  events: PropTypes.objectOf(PropTypes.any),
  onToggleUserModal: PropTypes.func.isRequired,
  userId: PropTypes.string,
  lang: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);
