import React from "react";
import Header from "Components/Header";
import Footer from "Components/Footer";
import "./layout.scss";

class Layout extends React.Component {
  componentDidMount() {
    window.Kakao.PlusFriend.createChatButton({
      container: "#plusfriend-chat-button",
      plusFriendId: "_FTmxfT" // 플러스친구 홈 URL에 명시된 id로 설정합니다.
    });
  }
  render() {
    return (
      <div className="contentWrap">
        <Header />
        <div id="plusfriend-chat-button"></div>
        <div id="chat-button" />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
