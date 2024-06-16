import useAxiosPublic from "../../Hooks/useAxiosPublic";
const image_hosting_key = "6c6d9827b1a74ce39e723830557272b6";
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import  { useState, useRef, useMemo} from 'react';
import JoditEditor from 'jodit-react';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};
const AddBlogs = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
        mutationFn: async blog=> {
            const { data } = await axiosSecure.post(`/blogpost`,blog)
            return data
        },
        onSuccess: data => {
           navigate('/dashboard/content-management')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const images = form.image.files[0];
        const image_File = new FormData();
        image_File.append("image", images);

        const res = await axiosPublic.post(image_hosting_Api, image_File, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const blogInfo = {
            title: title,
            image: res.data?.data?.display_url,
            content: stripHtml(content) ,
            status : 'draft'
        }
        try {
            const { data } = await mutateAsync(blogInfo)
        } catch (error) {
            console.log(error);
        }
        
    }

    const config = useMemo(() => ({
        readonly: false,
        height: 350,
        uploader: {
            insertImageAsBase64URI: true
        }
    }), []);
    return (
        <div>
            <div className=" w-[90%] mx-auto mt-5">
            <div className="my-5 rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
                        <h1 className="text-2xl p-2 px-5 text-white font-bold ">The Journey of Donated Blood</h1>
                    </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                              
                                <input
                                    type="text"
                                    name='title'
                                    placeholder="Title"
                                    className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                />
                            </div>

                        </div>
                        <div className="flex flex-col items-center md:flex-row gap-5">
                            
                            <div className='file_upload py-2 px-5 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                    <div className='flex flex-col w-max mx-auto text-center'>
                                        <label>
                                            <input
                                                className='text-sm  w-36 hidden'
                                                type='file'
                                                name='image'
                                                id='image'
                                                hidden
                                            />
                                            <div className='bg-[#5D0911] text-white border border-gray-300 hover:text-[#5D0911] rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-100'>
                                                Upload Image
                                            </div>
                                        </label>
                                    </div>
                                </div>
                        </div>
                        <div className="">
                            <JoditEditor
                                ref={editor}
                                tabIndex={1}
                                config={config}
                                value={content}
                                onChange={newContent => setContent(newContent)}
                            />
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Update" className="w-full btn transition-colors duration-300 transform font-bold text-xl text-rose-100 badge  bg-[#5D0911] hover:bg-rose-100 rounded-lg  hover:text-[#5D0911]" />
                    </div>

                </form>
            </div>
           
        </div>
    );
};

export default AddBlogs;