import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser, getUsers, updateUser, deleteUser } from "./Api";

function Task4() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []); // Ensure users is always an array
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "At least 3 characters"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle form submission (Create or Update)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, values);
        setUsers(users.map((user) => (user.id === editingUser.id ? { ...values, id: editingUser.id } : user)));
        setEditingUser(null);
      } else {
        const newUser = await createUser(values);
        setUsers([...users, newUser]);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>

      {/* Form for Creating/Updating Users */}
      <Formik
        initialValues={{
          name: editingUser ? editingUser.name : "",
          email: editingUser ? editingUser.email : "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <div>
              <Field type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded" disabled={isSubmitting}>
              {editingUser ? "Update User" : "Add User"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Display Users */}
      <h2 className="text-xl font-bold mt-6">Users List</h2>
      <ul className="mt-3">
  {users?.length > 0 ? (
    users.map((user) => (
      <li key={user.id} className="flex justify-between p-2 border-b">
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => setEditingUser(user)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))
  ) : (
    <li className="text-gray-500 text-center py-2">No users available.</li>
  )}
</ul>

    </div>
  );
}

export default Task4;
