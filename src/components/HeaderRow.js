import React from "react";

import { Col } from "./Grid";

function HeaderRow({ handleSort }) {
  return (
    <div className="row mx-auto header-row">
      <Col size="md-2">
        <p>Image</p>
      </Col>
      <Col size="md-2">
        <p id="first" className="header-item" onClick={handleSort}>Name</p>
      </Col>
      <Col size="md-3">
        <p id="email" className="header-item" onClick={handleSort}>Email</p>
      </Col>
      <Col size="md-2">
        <p id="phone" className="header-item" onClick={handleSort}>Phone</p>
      </Col>
      <Col size="md-2">
        <p id="city" className="header-item" onClick={handleSort}>Location</p>
      </Col>
    </div>
  )
}

export default HeaderRow;
