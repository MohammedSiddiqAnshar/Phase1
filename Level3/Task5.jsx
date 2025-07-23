import { Formik } from 'formik';
import * as Yup from 'yup';

function Task5() {
    
    const initialValues = {
        name: '',
        email: '',
        password: '',
        age: ''
    };


    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),

        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format'),

        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Must contain at least one number'),

        age: Yup.number()
            .required('Age is required')
            .min(18, 'You must be at least 18 years old')
            .max(60, 'You must be below 60 years old')
    });


    const handleSubmit = (values, { resetForm }) => {
        console.log('Form Data:', values);
        alert('Form submitted successfully!');
        resetForm(); 
    };

    return (
        <div className="form-container">
            <h2>Complex Form with Validation</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your name"
                            />
                            {errors.name && touched.name && (
                                <div className="error">{errors.name}</div>
                            )}
                        </div>

                        
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                            />
                            {errors.email && touched.email && (
                                <div className="error">{errors.email}</div>
                            )}
                        </div>

                        
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your password"
                            />
                            {errors.password && touched.password && (
                                <div className="error">{errors.password}</div>
                            )}
                        </div>

            
                        <div>
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your age"
                            />
                            {errors.age && touched.age && (
                                <div className="error">{errors.age}</div>
                            )}
                        </div>

                        
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Task5;
