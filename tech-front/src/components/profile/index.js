import React, {useEffect, useState} from "react";
import axios from 'axios'
import OrderItem from './order-item'

const Profile = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders")
      .then((response) => setOrders(response.data));
  }, [orders.length]);

  return  (
    <div className="main-block">
      Profile
      <ul className="orders">
        {
          orders.map((el) => (
            <li>
              <OrderItem {...el}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default Profile;
