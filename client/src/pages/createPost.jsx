import React from 'react';
import {Button, FileInput, Select, TextInput} from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
           <h1 className='text-center text-3xl my-7 font-semibold'>create post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type="text" placeholder='Titel' required id='title'
                    clssName='flex-1'/>
                    <Select>
                        <option value="uncatrgorized">Select a Category</option>
                        <option value="javascript">MEARN STACK</option>
                        <option value="reactjs">AI</option>
                        <option value="nextjs">Frontend developer</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4
                 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*'/>
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                            Upload Image
                    </Button>

                </div>
                <ReactQuill theme='snow' placeholder='write somthing' className='h-72 mb-12' required/>
                <Button type='sbmit' gradientDuoTone='purpleToPink'>
                     publish
                </Button>
            </form>
        </div>
    );
};

export default CreatePost;
