import React from "react";
import "./myAccount.scss";
import Button from "Components/Button";
import Modal from "react-modal";
import ViewRewardsModal from "Components/Modal/ViewRewardsModal";
import LearnMoreModal from "Components/Modal/LearnMoreModal";

const customStyles = {
  // content: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto"
  // }
};

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedBtn: "",
      modalIsOpen: false
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  handleClick = e => {
    this.setState(
      {
        clickedBtn: e.target.name
      },
      () => this.setState({ modalIsOpen: !this.state.modalIsOpen })
    );
  };

  render() {
    const { clickedBtn } = this.state;
    return (
      <>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            {clickedBtn === "learnMore" && <LearnMoreModal />}
            {clickedBtn === "viewRewards" && <ViewRewardsModal />}
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
        <div
          className={` myAccountDetail ${
            this.props.className === "myAccount" ? "showDetail" : "hidden"
          }`}
        >
          <div className="creatorsClub detailRoot">
            <p>WeSocks CREATORS CLUB</p>
            <p>
              당신만의 양말을 디자인해서 포인트를 획득하세요 <br></br>
              WeSocks CREATOR에게는 다양한 혜택이 제공됩니다
            </p>
            <p>Points</p>
            <meter
              className="points"
              min="0"
              low="50"
              value="350"
              optimum="300"
              high="400"
              max="500"
            ></meter>
            <div className="creatorsClubDetail">
              <div className="creatorsClubIntroduction">
                <p>당신은 꼬꼬마입니다</p>
                <p>
                  Jason Kang 님만의 <br></br>WeSocks CREATORS Club ID를{" "}
                  <br></br>
                  활용해서 최고의 양말을 디자인해주세요. <br></br>CREATORS CLUB
                  LEVEL UP을 통해 <br></br>다양한 혜택을 누릴 수 있습니다.
                </p>
                <div className="creatorClubBtns">
                  <Button
                    className="viewRewardsBtn"
                    name="viewRewards"
                    text="VIEW YOUR REWARDS"
                    onClick={e => this.handleClick(e)}
                  />

                  <Button
                    className="learnMoreBtn"
                    name="learnMore"
                    text="LEARN MORE"
                    onClick={e => this.handleClick(e)}
                  />
                </div>
              </div>
              <div className="clubImage"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MyAccount;
