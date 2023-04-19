import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
const RegisterInputs = ({registerOrLogin}) => {
     
    function registerValidate(values){
        const errors = {}

        if (!values.email) {
    
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

    
        if (!values.username) {
    
            errors.username = 'Required';
          }

          if(!values.password){
            errors.password= 'Required'
          }else if(values.password.length < 8 || values.password.length > 20  ){
    
            errors.password ="Must be greater than 8 and less than 20 characters long"
          }else if(values.cpassword.includes(" ")){
            errors.cpassword = "Invalid password"
          }

          if(!values.cpassword){
            errors.cpassword = "Required"
          }else if(values.password !== values.cpassword){
            errors.cpassword = 'Passwords don`t match'
          }else if(values.cpassword.includes(" ")){
            errors.cpassword = "Invalid password"
          }
        
          
          return errors
      }
      const [errorRegister, SetErrorMesage] = useState('')
      const form = useRef()

    const formik = useFormik({
        initialValues:{
          username:"",
          email:"",
          cpassword:'',
          password:''
        },
        validate: registerValidate,
        onSubmit
      })
  
      async function onSubmit(values){
        const res = await fetch('/api/register/', {method:'POST', 
    body:JSON.stringify(values)})

        if(res.ok){
            console.log('ok')
            registerOrLogin('Login')
            form.reset()
           
        }else{
          SetErrorMesage("Emai is already Registered")
        }
  
      }
  
  return (
    <>
    
    <form onSubmit={formik.handleSubmit} ref={form} >
      <span className='text-red'>{errorRegister}</span>
    {formik.errors.username && formik.touched.username ? <span className='text-red'>{formik.errors.username}</span> :<> </> }

     <Input placeholder='Username' type='text' name='username' className={`my-2 text-black ${formik.errors.username && formik.touched.username ? 'border-2 border-red': ''}`}{...formik.getFieldProps('username')}/>
     {formik.errors.email && formik.touched.email ? <span className='text-red'>{formik.errors.email}</span> :<> </> }

                    <Input placeholder='Email' type='text' name='email' className='my-2 text-black' {...formik.getFieldProps('email')} />
                    {formik.errors.password && formik.touched.password ? <span className='text-red'>{formik.errors.password}</span> :<> </> }

                    <Input placeholder='Password' type='password' name='password'  className='my-2 text-black' {...formik.getFieldProps('password')} />
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-red'>{formik.errors.cpassword}</span> :<> </> }

                    <Input placeholder='Repeat Password' type='password' name='cpassword' className='text-black' {...formik.getFieldProps('cpassword')}/>
                    <Button variant='outline' className='mt-2 w-full bg-button text-white '>Register </Button>
                    </form>
    </>
  )
}

export default RegisterInputs
