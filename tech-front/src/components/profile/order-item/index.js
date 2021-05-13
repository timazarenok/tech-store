import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'

const OrderItem = ({id, items}) => {
  return (
    <Card>
      <Card.Title>{id}</Card.Title>
      <Card.Body>
        {
          items.map(el => (
            <div>
              <h3>
                {el.name}
                <h2>{el.count}</h2>
              </h3>
              <h5>{el.price}</h5>
            </div>
          ))
        }
      </Card.Body>
    </Card>
  )
}

export default OrderItem;