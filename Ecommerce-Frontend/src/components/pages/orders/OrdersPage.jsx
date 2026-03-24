import axios from "axios"
import { Header } from "../../Header"
import { useEffect, useState } from "react"
import { OrderGrid } from "./OrderGrid"
import "./ordersPage.css"

export function OrdersPage({cart, loadCart, user}) {
    const [orders, setOrders] = useState([])
    useEffect(()=> {
        const fetchOrdersData = async () => {
            const response = await axios.get('http://localhost:3001/api/orders', {withCredentials: true});
            setOrders(response.data)
        }
        fetchOrdersData()
    }, [])

    return (
        <div>
            <title>Orders</title>
            <Header cart ={cart} user={user}/>
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrderGrid orders = {orders} loadCart={loadCart}/>
            </div>
        </div>
    )
}