import {useFormik} from 'formik'
function Task1(){
    const onSubmit = ()=>{
        console.log('submited',{values})
    }
    const {values , handleChange , handleSubmit} = useFormik({
        initialValues:{
            name:'',
            email:''
        },
        onSubmit
    })

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input id='name' type="text" value={values.name} onChange={handleChange} placeholder='please Enter Your Name' />
            <label htmlFor="Email">Email:</label>
            <input id='email' type="email" value={values.email} onChange={handleChange} placeholder='please Enter Your Email'/>
            <button type='submit'>Submit</button>
        </form></div>
    )
}
export default Task1