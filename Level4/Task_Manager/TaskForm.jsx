import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskForm = ({ fetchTasks }) => {
    const navigate = useNavigate();

    const initialValues = { title: "", status: "Pending" };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
        await axios.post("https://jsonplaceholder.typicode.com/posts", values);
        fetchTasks();
        resetForm();
        navigate("/tasks");
        } catch (error) {
        console.error("Error adding task", error);
        }
        setSubmitting(false);
    };

    return (
        <div>
        <h2>Add Task</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
            <div>
                <label>Title:</label>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" style={{ color: "red" }} />
            </div>
            <div>
                <label>Status:</label>
                <Field as="select" name="status">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                </Field>
            </div>
            <button type="submit">Add Task</button>
            </Form>
        </Formik>
        </div>
    );
    };

    export default TaskForm;
