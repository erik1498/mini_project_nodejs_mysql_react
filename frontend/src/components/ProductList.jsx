import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProduct();
    }, [])

    const getAllProduct = async () => {
        const response = await axios.get("http://localhost:5000/product")
        setProducts(response.data)
    }

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/product/${productId}`)
        getAllProduct()
    }
    return <>
        <h1 className="title">Product</h1>
        <h2 className="subtitle">List of Product</h2>
        <Link to={"/product/add"} className="button is-primary mb-2">Add New</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Created By</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    products.map((product, index) => (
                        <tr key={product.uuid}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.user.name}</td>
                            <td>
                                <Link to={`/product/edit/${product.uuid}`} className="button is-small is-info">Edit</Link>
                                <button className="button is-small is-danger" onClick={() => deleteProduct(product.uuid)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
}