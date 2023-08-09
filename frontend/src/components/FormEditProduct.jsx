import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function FormEditProduct() {
    
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [msg, setMsg] = useState("")
    const { id } = useParams()

    const navigate = useNavigate();

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/product/${id}`, {
                name:name,
                price:price
            })
            navigate("/product")
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/${id}`)
                setName(response.data.name)
                setPrice(response.data.price)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg)
                }
            }
        }
        getProductById();
    }, [id])

    return <>
        <h1 className="title">Products</h1>
        <h2 className="subtitle">Edit Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={updateProduct}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Price</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-success" type="submit">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}