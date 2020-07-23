import React from "react";

import { Col, Row } from "./Grid";

function Result({ id, thumbnail, first, last, email, phone, city, state }) {
  return (
    <Row key={id}>
      <Col size="md-1">
        <img className="mx-auto" src={thumbnail} alt={`${first} ${last}`} />
      </Col>
      <Col size="md-2">
        <p>
          {first} {last}
        </p>
      </Col>
      <Col size="md-3">
        <p>{email}</p>
      </Col>
      <Col size="md-2">
        <p>{phone}</p>
      </Col>
      <Col size="md-2">
        <p>
          {city}, {state}
        </p>
      </Col>
    </Row>
  )
}

export default Result;
