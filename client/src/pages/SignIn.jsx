import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {signInFailure, signInStart, signInSuccess} from "../redux/user/userSlice.js";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '', password: ''
    });
    const {errorMessage,loading}=useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch =useDispatch();
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.id]: e.target.value.trim()});

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
           return  dispatch(signInFailure('all fields are required'))
        }

        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/sign-in', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/home')
            }
        } catch (error) {
           dispatch(signInFailure(error.message))
        }
    };
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5">
                {/*left side*/}
                <div className="flex-1">
                    <Link to='/' className='
             font-bold dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>Goitom</span> Blog
                    </Link>
                    <p className='text-sm mt-5'>this is goitoms blog app you can sign up with your email and password
                        or with Google</p>
                </div>
                {/*right side*/}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div>
                            <Label value='your email'/>
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='your password'/>
                            <TextInput
                                type='password'
                                placeholder='password'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size='sm'/>
                                    <span className='pl-3'>Loading</span>
                                </>

                            ) : "Sign In"}
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>didn't haven an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>Sign In</Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
