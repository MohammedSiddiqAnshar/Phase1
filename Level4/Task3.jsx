import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
        password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
        ...(isLogin
        ? {}
        : {
            confirmPassword: Yup.string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            }),
    });

    const handleSubmit = (values, { resetForm }) => {
        if (isLogin) {
        if (values.email === "" && values.password === "") {
            setMessage("Login successful!");
        } else {
            setMessage("Invalid credentials.");
        }
        } else {
        setMessage("Signup successful! Please login.");
        }
        resetForm();
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "Login" : "Signup"}</h2>
            {message && <p className="mb-2 text-center text-green-600">{message}</p>}
            <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                <div className="mb-2">
                    <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>

                <div className="mb-2">
                    <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                </div>

                {!isLogin && (
                    <div className="mb-2">
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
                    </div>
                )}

                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded mt-2" disabled={isSubmitting}>
                    {isLogin ? "Login" : "Signup"}
                </button>
                </Form>
            )}
            </Formik>
            <p className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button
                onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
                }}
                className="text-blue-600 underline ml-1"
            >
                {isLogin ? "Sign up" : "Log in"}
            </button>
            </p>
        </div>
        </div>
    );
}
