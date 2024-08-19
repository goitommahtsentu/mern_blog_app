import React, {useState} from 'react';
import {Alert, Button, FileInput, Select, TextInput} from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase.js";
import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import {useNavigate} from 'react-router-dom';


const CreatePost = () => {
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate()


    const handleUpdloadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('please select an image')
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError('image upload failed')
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({...formData, image: downloadURL})
                    })
                }
            )
        } catch (e) {
            setImageUploadError('image upload filed')
            setImageUploadProgress(null)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok) {
                setPublishError(data.message)
                return;
            }

            if (res.ok) {
                setPublishError(null)
                navigate(`/post/${data.slug}`);
            }
        } catch (e) {
            setPublishError('something went wrong')
        }
    }
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>create post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type="text" placeholder='Title' required id='title' clssName='flex-1'
                               onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <Select onchage={(e) => ({...formData, category: e.target.value})}>
                        <option value="uncatrgorized">Select a Category</option>
                        <option value="javascript">MEARN STACK</option>
                        <option value="reactjs">AI</option>
                        <option value="nextjs">Frontend developer</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUpdloadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 object-cover'
                    />
                )}
                <ReactQuill theme='snow' placeholder='write somthing' className='h-72 mb-12' required
                            onChange={(value) => {
                                setFormData({...formData, content: value})
                            }}
                />
                <Button type='sbmit' gradientDuoTone='purpleToPink'>

                    publish
                </Button>
                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
            </form>
        </div>
    )
};

export default CreatePost;
