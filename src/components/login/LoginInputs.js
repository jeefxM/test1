import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginInputs = () => {
    const route = useRouter()
    function loginValidate(values){
        const errors = {}
    
        if (!values.email) {
    
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if(!values.password){
            errors.password= 'Required'
          }else if(values.password.length < 8 || values.password.length > 20  ){
    
            errors.password ="Must be greater than 8 and less than 20 characters long"
          }else if(values.password.includes(' ')){
            errors.password = "Invalid Password"
          }
        
          
          return errors
      }

      const [loginError, setLoginError] = useState('')

      const onSubmit = async (values)=> {
        const res = await signIn('credentials', {redirect:false, email: values.email, password: values.password, callbackurl:'/'},  )

        
        if(res.ok){
            route.push('/')
        }else{

            setLoginError('Wrong email or password')
        }
      }
    
      const formik = useFormik({
        initialValues:{
          email:"",
          password:''
        },
    
        validate:loginValidate,
    
        onSubmit
      })
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <span className='text-red my-3'>{loginError}</span>
                                       {formik.errors.email && formik.touched.email ? <span className='text-red'>{formik.errors.email}</span> :<> </> }
                                      <Input placeholder='Email' type='text' name='email' className={`my-2 text-black `}{...formik.getFieldProps('email')}/>
                                      { formik.errors.password && formik.touched.password ? <span className='text-red' >{formik.errors.password}</span> :<> </> }

                                      <Input placeholder='Password' type='password' name='password' className='text-black' onChange={formik.handleChange} value={formik.values.password}/>
                                      <Button  type='submit' variant='outline' className='mt-2 w-full bg-button text-white'  >Log In </Button>
                                      </form>
                                      </>
  )
}

export default LoginInputs