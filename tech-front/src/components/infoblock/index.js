import React from "react";
import "./infoblock.css";
import box1 from "../../images/box1.png";
import box2 from "../../images/box2.jpg";
import box4 from "../../images/box4.jpg";
import box5 from "../../images/box5.jpg";
import box6 from "../../images/box6.jpg";
import { Button } from "react-bootstrap";

const InfoBlock = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 team-img">
        <img className="img-big" src={box1} alt="sales" />
        <figcaption className="overlay">
          <Button className="sale-button"><Link to="http://84.201.178.27:8000/catalog/1">Подробнее</Link></Button>
        </figcaption>
      </div>
      <div className="col-md-6 team-img">
        <img className="img-big" src={box2} alt="sales" />
        <figcaption className="overlay">
          <Button className="sale-button"><Link to="http://84.201.178.27:8000/catalog/2">Подробнее</Link></Button>
        </figcaption>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 team-img">
        <img className="img-small" src={box4} alt="sales" />
        <figcaption className="overlay">
          <Button className="sale-button">Подробнее</Button>
        </figcaption>
      </div>
      <div className="col-md-4 team-img">
        <img className="img-small" src={box5} alt="sales" />
        <figcaption className="overlay">
          <Button className="sale-button"><Link to="http://84.201.178.27:8000/catalog/3">Подробнее</Link></Button>
        </figcaption>
      </div>
      <div className="col-md-4 team-img">
        <img className="img-small" src={box6} alt="sales" />
        <figcaption className="overlay">
          <Button className="sale-button"><Link to="http://84.201.178.27:8000/catalog/3">Подробнее</Link></Button>
        </figcaption>
      </div>
    </div>
  </div>
);

export default InfoBlock;
