import {useFormik} from 'formik'
import { basicSchema } from './schemas'
function Task2(){
    const onSubmit = ()=>{
        console.log('submited',{values})
    }
    const {values , handleChange , handleSubmit , errors} = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            cpassword:''
        },
        onSubmit,
        validationSchema:basicSchema
    })

    console.log(errors)

    return(
        <div>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input id='name' type="text" value={values.name} onChange={handleChange} placeholder='please Enter Your Name' />
            <label htmlFor="Email">Email:</label>
            <input id='email' type="email" value={values.email} onChange={handleChange} placeholder='please Enter Your Email'/>
            <label htmlFor="Password">Password</label>
            <input id='password' type="password" value={values.password} onChange={handleChange} placeholder='please Enter Your Password'/>
            <label htmlFor="CurrentPassword">CurrentPassword</label>
            <input id='cpassword' type="password" value={values.cpassword} onChange={handleChange} placeholder='please Enter Your Password'/>
            <button type='submit'>Submit</button>
        </form></div>
    )
}
export default Task2