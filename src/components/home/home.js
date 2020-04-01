import React, { useEffect } from "react";
import { ReactComponent as ManWatchSvg } from "../../images/man-watch.svg";
import { connect } from "react-redux";
import Button from "../UI/button/button";
import { toggleUserModal } from "../../store/actions/index";

const Home = props => {
  useEffect(() => {
    props.onToggleUserModal();
  }, []);

  const newCdtRedirectHandler = () => {
    props.history.push("/new-countdown-timer");
  };

  return (
    <section className="section-home">
      <div className="section-home__text-box">
        <h1 className="section-home__title">
          <span className="section-home__span-1">
            Create, share, discuss events
          </span>
          <span className="section-home__span-2">and watch them count!</span>
        </h1>
        <Button
          type="button"
          style={{
            marginTop: "4rem"
          }}
          clicked={newCdtRedirectHandler}
          className="button--primary"
        >
          Get started
        </Button>
      </div>
      <ManWatchSvg className="section-home__img" />
    </section>
  );
};

const mapDispatchToProps = dispatch => ({
  onToggleUserModal: () => dispatch(toggleUserModal())
});

export default connect(null, mapDispatchToProps)(Home);
