"use client"

import React, {useState, useEffect} from 'react';
import {Button, Form, type FormProps, Input} from 'antd';
import {useGetTokenQuery} from "@/lib/features/auth/authApiSlice";
import {getTokenApiResponse} from "@/lib/features/auth/types"
import {inputLoginFormType} from "@/app/login/types";


const onFinishFailed: FormProps<inputLoginFormType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


export default function App() {
    const [token, setToken] = useState<getTokenApiResponse>();
    const [formValues, setFormValues] = useState<inputLoginFormType>({});

    const {data, isError, isLoading, isSuccess, refetch} =
        useGetTokenQuery(formValues, {skip: Object.keys(formValues).length === 0});

    const onFinish: FormProps<inputLoginFormType>["onFinish"] = (values) => {
        // console.log('Success:', values);
        setFormValues(values);
        let isLoggedOn = window.localStorage.getItem("is_logged_on")
        if (isLoggedOn != "1") {
            refetch();
        }
    }
    useEffect(() => {
        window.localStorage.setItem("is_logged_on", "0")
    }, []);


    useEffect(() => {
        if (isSuccess && data) {
            setToken(data);
            window.localStorage.setItem("is_logged_on", "1")
        }
    }, [isSuccess, data]);


    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<inputLoginFormType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<inputLoginFormType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}
