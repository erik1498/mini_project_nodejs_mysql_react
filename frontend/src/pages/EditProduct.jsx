import React, {useEffect} from "react";
import FormEditProduct from "../components/FormEditProduct";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

export default function EditProduct() {

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
            <FormEditProduct />
        </Layout>
    </>
}