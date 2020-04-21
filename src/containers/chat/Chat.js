import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { database, auth } from '../../store/firebase/firebase';
import transition025 from '../../shared/animationTransitions';
import './chat.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      message: '',
      isShareButtonClicked: false,
    };
    this.chatAreaRef = React.createRef();
  }

  componentDidMount() {
    const chatArea = this.chatAreaRef.current;

    database()
      .ref('chats')
      .on('value', (snapshot) => {
        const chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort((a, b) => a.timestamp - b.timestamp);
        this.setState({ chats }, () =>
          chatArea.scrollBy(0, chatArea.scrollHeight),
        );
      });
  }

  shareButtonClickHandler = () =>
    this.setState((prevState) => ({
      isShareButtonClicked: !prevState.isShareButtonClicked,
    }));

  messageSubmitHandler = (event) => {
    event.preventDefault();

    const { message, user } = this.state;

    if (message.length === 0) return;
    const chatArea = this.chatAreaRef.current;

    database().ref('chats').push({
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      message,
      timestamp: Date.now(),
      event: '',
    });
    this.setState({ message: '' }, () =>
      chatArea.scrollBy(0, chatArea.scrollHeight),
    );
  };

  messageChangeHandler = (event) =>
    this.setState({
      message: event.target.value,
    });

  inputKeyDownHandler = (event) => {
    if (event.which === 13) this.messageSubmitHandler(event);
  };

  eventNameButtonClickHandler = (eventId) => {
    const { events } = this.props;

    for (const key in events) {
      if (events[key].id === eventId) {
        const { message, user } = this.state;
        const chatArea = this.chatAreaRef.current;
        database()
          .ref('chats')
          .push({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            message,
            timestamp: Date.now(),
            event: {
              name: events[key].name,
              date: events[key].date,
              time: events[key].time,
              address: events[key].address,
              description: events[key].description,
            },
          });
        chatArea.scrollBy(0, chatArea.scrollHeight);
      }
    }
  };

  render() {
    let eventNames = null;
    const { events, lang, content } = this.props;

    if (events !== undefined && events !== null) {
      eventNames = Object.values(events).map((event) => (
        <button
          key={event.id}
          type="button"
          onClick={() => this.eventNameButtonClickHandler(event.id)}
          className="user-event-popup__event-name-button"
        >
          <i className="fa fa-plus" />
          {event.name}
        </button>
      ));
    }

    let componentContent = null;

    if (lang === 'en' && content.en !== undefined) {
      componentContent = {
        inputPlaceholder: content.en.chat.inputPlaceholder,
        buttonSend: content.en.chat.buttonSend,
        buttonShare: content.en.chat.buttonShare,
        popupTitle: content.en.chat.popupTitle,
        notPopupTitle: content.en.chat.notPopupTitle,
        eventMessage: content.en.chat.eventMessage,
      };
    } else {
      componentContent = {
        inputPlaceholder: content.ru.chat.inputPlaceholder,
        buttonSend: content.ru.chat.buttonSend,
        buttonShare: content.ru.chat.buttonShare,
        popupTitle: content.ru.chat.popupTitle,
        notPopupTitle: content.ru.chat.notPopupTitle,
        eventMessage: content.ru.chat.eventMessage,
      };
    }

    return (
      <>
        <div className="chat">
          <div ref={this.chatAreaRef} className="chat__messages">
            {this.state.chats.map((chat) => {
              return (
                <p
                  key={chat.timestamp}
                  className={
                    this.state.user.uid === chat.uid
                      ? 'chat__message-box chat__message-box--current-user'
                      : 'chat__message-box'
                  }
                >
                  <span className="chat__username">
                    {chat.username !== undefined
                      ? `${chat.username},`
                      : `${chat.email},`}
                  </span>
                  <span className="chat__time">
                    {moment(chat.timestamp).format('HH:m')}
                  </span>
                  <span className="chat__message">{chat.message}</span>

                  {chat.event !== '' ? (
                    <span className="event">
                      <span
                        className={
                          this.state.user.uid === chat.uid
                            ? 'event__title event__title--current-user'
                            : 'event__title'
                        }
                      >
                        {componentContent.eventMessage}
                      </span>
                      <span className="event__content">
                        <span className="event__name">{chat.event.name}</span>
                        <span className="event__date">{chat.event.date}</span>
                        <span className="event__time">{chat.event.time}</span>
                        <span className="event__address">
                          {chat.event.address}
                        </span>
                        <span className="event__description">
                          {chat.event.description}
                        </span>
                      </span>
                    </span>
                  ) : null}
                </p>
              );
            })}
          </div>
          <button
            type="button"
            className="chat__button-share"
            onClick={this.shareButtonClickHandler}
          >
            {componentContent.buttonShare}
          </button>
          <form onSubmit={this.messageSubmitHandler} className="chat__form">
            <input
              onChange={this.messageChangeHandler}
              onKeyDown={this.inputKeyDownHandler}
              value={this.state.message}
              placeholder={componentContent.inputPlaceholder}
              className="chat__input"
            />
            <button type="submit" className="chat__button">
              {componentContent.buttonSend}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {this.state.isShareButtonClicked ? (
            <motion.div
              className="user-event-popup"
              transition={transition025}
              initial={{
                opacity: 0,
                x: '-10rem',
              }}
              animate={{
                opacity: 1,
                x: '0rem',
              }}
              exit={{
                opacity: 0,
                x: '-10rem',
              }}
            >
              <h3 className="user-event-popup__title">
                {this.props.events !== null
                  ? componentContent.popupTitle
                  : componentContent.notPopupTitle}
              </h3>
              {eventNames}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  events: state.userEvents.events,
  userId: state.auth.user !== null ? state.auth.user.uid : null,
  lang: state.ui.lang,
  content: state.content.content,
});

export default connect(mapStateToProps, null)(Chat);
