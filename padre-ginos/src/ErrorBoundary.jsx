import { Link } from "@tanstack/react-router";
import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // send to TrackJS/Sentry
    console.log("caught some dumb error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this page. <Link to="/">Click here</Link> to
            go back home
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
