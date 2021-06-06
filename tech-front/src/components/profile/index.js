import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, ListGroup, Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

const Profile = () => {
    const [orders, setOrders] = useState([])

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        updateData();
        console.log(orders)
    }, [orders.length])

    const updateData = () => {
        axios.get("http://localhost:3000/api/orders/user/" + user.id)
        .then(response => setOrders(response.data))
        .catch(err => console.log(err))
    }

    const totalPrice = (arr) => {
        return arr.reduce((sum, el) => sum + el.price * el.orderProduct.count, 0)
    }

    const totalCount = (arr) => {
        return arr.reduce((sum, el) => sum + el.orderProduct.count, 0)
    }

    const onDelete = (id) => {
        axios.delete("http://localhost:3000/api/order/" + id)
            .then(() => {
                updateData();
                NotificationManager.success('Успешно удален', 'Успех')
            })
            .catch(err => NotificationManager.error('Попробуйте позже', 'Ошибка')
            )
    }

    return (
        <>
            {
                orders === [] ? (
                    <div>
                        <h1 className="cart-empty">У вас пока нет заказов, перейдите в каталог чтобы сделать заказ</h1>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {
                                orders.map(el => (
                                    <Card className="order-card">
                                        <Card.Title className="order-card-title">
                                            <h2>Номер: {el.id}</h2>
                                        </Card.Title>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                {
                                                    el.products.map(el => (
                                                        <ListGroup.Item>{el.name} {el.orderProduct.count}шт. {el.price * el.orderProduct.count} BYN</ListGroup.Item>
                                                    ))
                                                }
                                            </ListGroup>
                                            <Card.Text>Кол-во: {totalCount(el.products)} шт.</Card.Text>
                                            <Card.Text>Сумма: {totalPrice(el.products)} BYN</Card.Text>
                                            <Card.Text>
                                                {
                                                    el.status ? "Обработан" : "Не обработан"
                                                }
                                            </Card.Text>
                                            <Button type="submit" onClick={() => onDelete(el.id)} className="submit-button">
                                                Отменить заказ
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default Profile;