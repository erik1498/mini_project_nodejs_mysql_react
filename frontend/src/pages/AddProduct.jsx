import React, {useEffect} from "react";
import FormAddProduct from "../components/FormAddProduct";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

export default function AddProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(GetMe())
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/")
        }
    }, [isError, navigate]);

    return <>
        <Layout>
            <FormAddProduct />
        </Layout>
    </>
}