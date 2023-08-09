import React, {useEffect} from "react";
import UserList from "../components/UserList";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

export default function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(GetMe())
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/")
        }
        if (user && user.role !== "admin") {
            navigate("/")
        }
    }, [isError, user, navigate]);

    return <>
        <Layout>
            <UserList />
        </Layout>
    </>
}