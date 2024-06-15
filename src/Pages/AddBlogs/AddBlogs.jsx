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
        height: 400,
        uploader: {
            insertImageAsBase64URI: true
        }
    }), []);
    return (
        <div>
            <div className=" w-[90%] mx-auto mt-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm">Title</label>
                                <input
                                    type="text"
                                    name='title'
                                    placeholder="Enter your Name"
                                    className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                />
                            </div>

                        </div>
                        <div className="flex flex-col items-center md:flex-row gap-5">
                            <div className="w-full ">
                              
                                <input
                                    name="image"
                                    type="file"
                                    className="p-2 w-full max-w-xs"
                                />
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
                        <input type="submit" value="Update" className="w-full btn bg-blue-500 hover:bg-blue-700 border-none text-white" />
                    </div>

                </form>
            </div>
           
        </div>
    );
};

export default AddBlogs;