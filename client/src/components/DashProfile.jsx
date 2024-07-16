import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, TextInput} from "flowbite-react";

const DashProfile = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-32 h-32 self-center cursor-pointer shadow-md
                overflow-hidden rounded-full'>
                    <img src={currentUser.profilePicture} alt="user"
                         className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
                </div>
                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='password'
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                >
                    Update
                </Button>

            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
};

export default DashProfile;
