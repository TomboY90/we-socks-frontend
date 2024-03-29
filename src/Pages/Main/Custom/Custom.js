/* eslint-disable no-unused-expressions */
import React from "react";
import "./custom.scss";
import Button from "Components/Button";
import SockItem from "Components/SockItem";
import Layout from "Components/Layout";
import InputBox from "Components/InputBox";
import { API_URL } from "config";
import axios from "axios";
import Span from "Components/Span";
import * as patternImage from "Components/SockItem/patternImages";
import * as uploadedImage from "Components/SockItem/uploadedImages";
import AddedToCartMessage from "Components/AddedToCartMessage";
import Axios from "axios";

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
  uploadedImage.nike,
  uploadedImage.apple,
  uploadedImage.weCodeLogo,
  uploadedImage.plus
];

const viewArr = ["front", "back", "side"];
const typeArr = ["noShow", "ankle", "mid", "high"];

class Custom extends React.Component {
  state = {
    color: "none",
    type: 0,
    view: "front",
    pattern: "",
    patternSize: 30,
    price: 6000,
    uploaded: 0,
    addToCartBtnClicked: false,
    addToWishListBtnClicked: false,
    patternChosen: false,
    imageChosen: false,
    imgArr: "",
    X: 0,
    Y: 0,
    top: 0,
    left: 0
  };

  imgUproad = e => {
    e.persist();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ ...this.state, imgArr: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    let formData = new FormData();
    formData.append("image", file);

    let headers = {
      "content-type": "multipart/form-data"
    };

    Axios.post("http://10.58.3.112:8000/aws/upload", formData, {
      headers
    });
  };

  onImgBtnClick = (e, image) => {
    this.changeDesign(e, uploadedImageArr.indexOf(image));
    this.setState({
      ...this.state,
      imgArr: image
    });
  };

  onDragStart = e => {
    e.persist();
    this.pageX = e.pageX;
    this.pageY = e.pageY;
  };

  dragEnd = e => {
    e.persist();

    const { top, left } = this.state;
    const gapX = e.pageX - this.pageX;
    const gapY = e.pageY - this.pageY;

    this.setState({
      top: top + gapY,
      left: left + gapX
    });
  };

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
    }
    if (
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
        () => console.log(this.state.imageChosen) //this.increasePrice()
      );
    }
    if (
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
      user_pk: 1,
      label: "socks",
      category_id: 1,
      main_type_id: this.state.type + 1,
      color: this.state.color,
      pattern_type_id: this.state.pattern,
      pattern_size: this.state.patternSize,
      logo_type_id: this.state.uploaded + 1,
      logo_size: 3,
      logo_x_coordinate: this.state.top,
      logo_y_coordinate: this.state.left,
      other_req: "req",
      count: 1,
      unit_price: this.state.price
    };

    axios
      .post(`${API_URL}product/add_cart_req`, sockData)
      .then(response => {
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
      })
      .catch(error => {
        alert("이미 등록된 상품입니다.");
      });
  };

  addToWishList = () => {
    let sockData = {
      user_pk: 1,
      label: "socks",
      category_id: 1,
      main_type_id: this.state.type + 1,
      color: this.state.color,
      pattern_type_id: this.state.pattern,
      pattern_size: this.state.patternSize,
      logo_type_id: this.state.uploaded + 1,
      logo_size: 3,
      logo_x_coordinate: this.state.top,
      logo_y_coordinate: this.state.left,
      other_req: "req",
      count: 1,
      unit_price: this.state.price
    };

    axios
      .post(`${API_URL}product/wish_req`, sockData)
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
          window.location.reload();
        }
      })
      .catch(error => {
        alert("이미 등록된 상품입니다.");
        window.location.reload();
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
      addToWishListBtnClicked,
      top,
      left
    } = this.state;

    return (
      <Layout>
        <AddedToCartMessage showMessage={addToCartBtnClicked} />
        <div className="customRoot">
          <div className="chooseTypesWrap">
            <span className="chooseTitle">Type_</span>
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
            <span className="chooseTitle">View_</span>
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
              {this.state.imgArr && (
                <div
                  className="imgDragnDrop"
                  style={{
                    top,
                    left,
                    backgroundImage: `url(${this.state.imgArr})`
                  }}
                  alt={`${type} ${view}`}
                  draggable={true}
                  onDragStart={this.onDragStart}
                  onDragEnd={this.dragEnd}
                />
              )}
            </div>
            <div className="patternSizeBar">
              <input
                type="range"
                min="100"
                max="300"
                onChange={this.handleSize}
                value={patternSize}
                style={{ width: 250 }}
              ></input>
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
                          onClick={e => this.onImgBtnClick(e, image)}
                        />
                      );
                    })}
                    <input
                      type="file"
                      namep="uploaded"
                      className="customImgUpBtn"
                      onChange={this.imgUproad}
                    />
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
      </Layout>
    );
  }
}

export default Custom;
