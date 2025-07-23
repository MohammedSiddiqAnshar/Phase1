import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    name:yup.string().required('This is required'),
    email:yup.string().email('please fill valid email').required('This is required'),
    password:yup.string().min(5,"enter atleast 5 char").required('This is required'),
    cpassword:yup.string().oneOf([yup.ref('password'),null],"not matching").required('This is required')
})