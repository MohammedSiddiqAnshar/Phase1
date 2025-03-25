import {useFormik} from 'formik'
import { basicSchema } from '../Level1/src/schemas'
function Task2(){
    const onSubmit = ()=>{
        console.log('submited',{values})
    }
    const {values , handleChange , handleSubmit , errors , touched} = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            cpassword:''
        },
        onSubmit,
        validationSchema:basicSchema
    })

    console.log(errors,)

    return(
        <div>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input id='name' type="text" value={values.name} onChange={handleChange} placeholder='please Enter Your Name' className={errors.name && touched.name ? 'input-error' : ""} />
            {errors.name && touched.name && <p className='error'>{errors.name}</p>}
            <label htmlFor="Email">Email:</label>
            <input id='email' type="email" value={values.email} onChange={handleChange} placeholder='please Enter Your Email' className={errors.email && touched.email ? 'input-error' : ""}/>
            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
            <label htmlFor="Password">Password</label>
            <input id='password' type="password" value={values.password} onChange={handleChange} placeholder='please Enter Your Password' className={errors.password && touched.password ? 'input-error' : ""}/>
            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
            <label htmlFor="CurrentPassword">CurrentPassword</label>
            <input id='cpassword' type="password" value={values.cpassword} onChange={handleChange} placeholder='please Enter Your Password' className={errors.cpassword && touched.cpassword ? 'input-error' : ""}/>
            {errors.cpassword && touched.cpassword && <p className='error'  >{errors.cpassword}</p>}
            <button type='submit'>Submit</button>
        </form></div>
    )
}
export default Task2