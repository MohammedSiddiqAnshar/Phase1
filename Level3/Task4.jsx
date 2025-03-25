import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function Task4() {
    const [items, setItems] = useState([]);

    return (
        <div>
            <h2>Add Item</h2>
            <Formik
                initialValues={{ itemName: '' }}
                validationSchema={Yup.object({
                    itemName: Yup.string()
                        .required('Item name is required')
                        .min(2, 'Item must be at least 2 characters'),
                })}
                onSubmit={(values, { resetForm }) => {
                    // Add new item with unique key (using Date.now())
                    setItems([...items, { id: Date.now(), name: values.itemName }]);
                    resetForm(); // Clear form after submission
                }}
            >
                <Form className="form-container">
                    <div>
                        <label htmlFor="itemName">Item:</label>
                        <Field 
                            type="text" 
                            id="itemName" 
                            name="itemName" 
                            placeholder="Enter item name" 
                        />
                        <ErrorMessage name="itemName" component="div" className="error" />
                    </div>
                    <button type="submit">Add Item</button>
                </Form>
            </Formik>

            
            <h3>Items List:</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Task4;
