import axios from "axios"
import { Header } from "../../Header"
import { useEffect, useState } from "react"
import { OrderGrid } from "./OrderGrid"
import "./ordersPage.css"
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router"

export function OrdersPage({cart, loadCart}) {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchOrdersData = async () => {
            setIsLoading(true)
            const response = await axios.get('http://localhost:3001/api/orders', {withCredentials: true});
            setOrders(response.data);
            setIsLoading(false)
        }
        fetchOrdersData()
    }, [])
    if (!user) return (navigate("/signin"))
    if (isLoading) return <div>Loading orders...</div>;
    if (orders.length === 0) return <div>No orders yet.</div>

    return (
        <div>
            <title>Orders</title>
            <Header cart ={cart}/>
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrderGrid orders = {orders} loadCart={loadCart}/>
            </div>
        </div>
    )
}