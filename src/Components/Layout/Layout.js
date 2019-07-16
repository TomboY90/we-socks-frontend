import React from "react";
import Header from "Components/Header";
import Footer from "Components/Footer";

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default Layout;
