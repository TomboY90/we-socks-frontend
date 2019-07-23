import React from "react";
import "./custom.scss";
import Button from "Components/Button";
import SockItem from "Components/SockItem";
import InputBox from "Components/InputBox";
import axios from "axios";
import Span from "Components/Span";
import * as patternImage from "Components/SockItem/patternImages";
import * as uploadedImage from "Components/SockItem/uploadedImages";
import AddedToCartMessage from "Components/AddedToCartMessage";

const colorArr = [
  "#F0EDE5",
  "#EAE6DA",
  "#F1EA7F",
  "#ECDB54",
  "#D1B894",
  "#C0AB8E",
  "#D5AE41",
  "#E47A2E",
  "#E94B3C",
  "#BD3D3A",
  "#BCBCBE",
  "#B4B7BA",
  "#EABEDB",
  "#DBB1CD",
  "#BE9EC9",
  "#BC70A4",
  "#6B5B95",
  "#944743",
  "#7F4145",
  "#6C4F3D",
  "#EC9787",
  "#BFD641",
  "#95DEE3",
  "#6F9FD8",
  "#3F69AA",
  "#00A591",
  "#006E6D",
  "#766F57",
  "#2E4A62",
  "#485167"
];

const patternArr = [
  "",
  patternImage.Argyle,
  patternImage.bear,
  patternImage.bird,
  patternImage.block,
  patternImage.color_block,
  patternImage.crown,
  patternImage.dotted,
  patternImage.flower,
  patternImage.heart,
  patternImage.raindrop,
  patternImage.stripe,
  patternImage.tree,
  patternImage.hive,
  patternImage.money,
  patternImage.tape
];

const uploadedImageArr = [
  "",
  uploadedImage.music,
  uploadedImage.moon,
  uploadedImage.nike,
  uploadedImage.mirror,
  uploadedImage.plus
];

const viewArr = ["front", "back", "side"];
const typeArr = ["noShow", "ankle", "mid", "high"];

class Custom extends React.Component {
  constructor() {
    super();

    this.state = {
      color: "none",
      type: 0,
      view: "front",
      pattern: "",
      patternSize: "",
      price: 6000,
      uploaded: "",
      priceChange: false,
      patternChosen: false,
      imageChosen: false,
      addToCartBtnClicked: false,
      addToWishListBtnClicked: false
    };
  }

  increasePrice = () => {
    this.setState({
      priceChange: !this.state.priceChange,
      price: this.state.price + 2000
    });
  };

  decreasePrice = () => {
    this.setState({
      priceChange: !this.state.priceChange,
      price: this.state.price - 2000
    });
  };

  changeDesign = (e, value) => {
    const sockProperty = [e.target.getAttribute("name")];
    this.setState({
      [sockProperty]: value
    });

    if (
      !this.state.patternChosen &&
      sockProperty[0] === "pattern" &&
      value !== 0
    ) {
      this.setState(
        {
          patternChosen: !this.state.patternChosen
        },
        () => this.increasePrice()
      );
    } else if (
      this.state.patternChosen &&
      sockProperty[0] === "pattern" &&
      value === 0
    ) {
      this.setState(
        {
          patternChosen: !this.state.patternChosen
        },
        () => this.decreasePrice()
      );
    }

    if (
      !this.state.imageChosen &&
      sockProperty[0] === "uploaded" &&
      value !== 0
    ) {
      this.setState(
        {
          imageChosen: !this.state.imageChosen
        },
        () => this.increasePrice()
      );
    } else if (
      this.state.imageChosen &&
      sockProperty[0] === "uploaded" &&
      value === 0
    ) {
      this.setState(
        {
          imageChosen: !this.state.imageChosen
        },
        () => this.decreasePrice()
      );
    }
  };

  addToCart = () => {
    let sockData = {
      know_design_id: "no",
      user_pk: 1,
      category_id: 1,
      main_type_id: this.state.type + 1,
      color: this.state.color,
      pattern_id: this.state.pattern,
      logo_id: this.state.uploaded,
      other_req: "req",
      amount: 1,
      unit_price: this.state.price
    };

    axios
      .post("http://10.58.7.11:8000/product/add_cart_req", sockData)
      .then(response => {
        if (response.status === 200) {
          this.setState(
            {
              addToCartBtnClicked: !this.state.addToCartBtnClicked
            },
            () => {
              setTimeout(() => {
                this.setState({
                  addToCartBtnClicked: !this.state.addToCartBtnClicked
                });
              }, 3000);
            }
          );
        }
      });
  };

  addToWishList = () => {
    let sockData = {
      know_design_id: "yes",
      user_pk: 1,
      category_id: 1,
      main_type_id: this.state.type + 1,
      color: this.state.color,
      pattern_id: this.state.pattern,
      logo_id: this.state.uploaded,
      unit_price: this.state.price
    };

    axios
      .post("http://10.58.7.11:8000/product/wish_req", sockData)
      .then(response => {
        if (response.status === 200) {
          this.setState(
            {
              addToWishListBtnClicked: !this.state.addToWishListBtnClicked
            },
            () => {
              setTimeout(() => {
                this.setState({
                  addToWishListBtnClicked: !this.state.addToWishListBtnClicked
                });
              }, 2000);
            }
          );
        }
      });
  };

  handleSize = e => {
    this.setState({
      patternSize: e.target.value
    });
  };

  render() {
    const {
      color,
      view,
      type,
      price,
      priceChange,
      pattern,
      patternSize,
      uploaded,
      addToCartBtnClicked,
      addToWishListBtnClicked
    } = this.state;

    return (
      <>
        <AddedToCartMessage showMessage={addToCartBtnClicked} />
        <div className="customRoot">
          <div className="chooseTypesWrap">
            Type:
            {typeArr.map((el, idx) => (
              <Button
                key={`type-${idx}`}
                className={`type ${
                  typeArr[type] === el ? `${el} clicked` : ""
                }`}
                name="type"
                text={`${
                  el === "noShow"
                    ? "No-Show"
                    : el[0].toUpperCase() + el.slice(1, el.length)
                }`}
                onClick={e => this.changeDesign(e, idx)}
              />
            ))}
          </div>
          <div className="chooseViewsWrap">
            View:
            {viewArr.map((el, idx) => (
              <Button
                key={`view-${idx}`}
                className={`view ${view === el ? `${el} clicked` : ""}`}
                name="view"
                text={el[0].toUpperCase() + el.slice(1, el.length)}
                onClick={e => this.changeDesign(e, el)}
              />
            ))}
          </div>
          <div className="customCenter">
            <div className="socksContainer">
              <SockItem
                color={color}
                pattern={pattern - 1}
                type={type}
                view={view}
                uploaded={uploaded - 1}
                patternSize={patternSize}
              />
            </div>
            <div className="patternSizeBar">
              <InputBox
                type="range"
                min="100"
                max="300"
                onChange={this.handleSize}
                value={patternSize}
                style={{ width: 250 }}
              />
            </div>

            <div className="rightSideWrap">
              <div className="chooseWrap">
                <div className="chooseColor">
                  <p>Choose Color</p>
                  <div className="colorPickerContainer">
                    {colorArr.map((color, idx) => (
                      <Button
                        className="color colorContainer"
                        name="color"
                        style={{ backgroundColor: color }}
                        key={`color-${idx}`}
                        onClick={e => this.changeDesign(e, color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="choosePattern">
                  <p>Choose Pattern</p>
                  <div className="patternPickerContainer">
                    {patternArr.map((image, idx) => {
                      return (
                        <Span
                          className="patternPicker"
                          style={{ backgroundImage: `url(${image})` }}
                          name="pattern"
                          key={`pattern-${idx}`}
                          onClick={e => this.changeDesign(e, idx)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="chooseImage">
                  <p>Choose Image</p>
                  <div className="imagePickerContainer">
                    {uploadedImageArr.map((image, idx) => {
                      return (
                        <Span
                          className="uploadedImagePicker"
                          style={{ backgroundImage: `url(${image})` }}
                          name="uploaded"
                          key={`uploaded-${idx}`}
                          onClick={e => this.changeDesign(e, idx)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="orderWrap">
                  <div
                    className={`priceEstimation ${
                      priceChange ? "priceChange" : ""
                    }`}
                  >
                    가격: {price}
                  </div>
                  <Button
                    className="addToCartBtn"
                    name="addToCartBtn"
                    text="장바구니 추가"
                    onClick={e => this.addToCart(e)}
                  />
                  <Button
                    className="addToWishListBtn"
                    name="addToWishListBtn"
                    text="위시리스트 추가"
                    onClick={e => this.addToWishList(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          {addToWishListBtnClicked && (
            <div className="messageAddedToWishList">
              해당 상품이 Wish List에 추가되었습니다
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Custom;
