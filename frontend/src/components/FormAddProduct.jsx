import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function FormAddProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [msg, setMsg] = useState("")

    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/product", {
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

    return <>
        <h1 className="title">Product</h1>
        <h2 className="subtitle">Add New Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveProduct}>
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
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}