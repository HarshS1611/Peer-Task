import Header from '@/components/Header'
import { useState } from 'react'
import Head from 'next/head'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../../blockchain/config";
import JobPortal from '../../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json'
import { uploadToIPFS, client } from '../utils/ipfs'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from 'next/router';

export default function CreateProject() {
    const [fileUrl, setFileUrl] = useState(null);
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        category: '',
        skills: '',
        image: '',
        duration: '',
        // status: '',
        // owner: '',
        // freelancer: '',
        // createdAt: '',
        // updatedAt: '',
    })

    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://peertask.infura-ipfs.io/ipfs/${added.path}`;
            setFileUrl(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    async function createProject() {
        const { title, description, category, skills, duration } = projectData
        if (!title || !description || !category || !skills || !fileUrl || !duration) return
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();


            const jobPortal = new ethers.Contract(contractAddress, JobPortal.abi, signer);
            const uri = await uploadToIPFS({ ...projectData, image: fileUrl });
            console.log(uri)
            const tx = await jobPortal.createProject(uri);
            await tx.wait();
            toast.success("Project created!");
            // console.log("Project created!");
            // set all the values to empty string and redirect to my projects page
            setProjectData({
                title: '',
                description: '',
                category: '',
                skills: '',
                image: '',
                duration: '',
            })
            setFileUrl(null)
            Router.push('/myprojects')
        } catch (err) {
            console.log("Error: ", err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(projectData)
        createProject()
    }

    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div
                className='flex flex-col items-center 
                justify-center'
            >
                <form className='bg-[#1a1e27] w-8/12 h-fit rounded-xl p-5 mt-3' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-white text-2xl text-center'>Create Project!</h2>
                    <div className='flex relative m-0'>
                        <input type="text" placeholder="Title"
                            value={projectData.title}
                            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                            id="username" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <textarea type="text" placeholder="Description"
                            value={projectData.description}
                            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                            id="description" className='block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none 
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <select type="text" placeholder="Category"
                            value={projectData.category}
                            onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                            id="category" className='block bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-3 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required >
                            <option value=""
                                className='bg-[#080020] p-5 m-8 text-white'
                            >Select Category</option>
                            <option value="DeFi"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >DeFi</option>
                            <option value="NFTs"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >NFTs</option>
                            <option value="DAOs"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >DAOs</option>
                            <option value="AI/ML"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >AI/ML</option>
                            <option value="Cloud Computing"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >Cloud Computing</option>
                        </select>
                    </div>
                    <div className='flex relative m-0'>
                        <input type="text" placeholder="Skills"
                            value={projectData.skills}
                            onChange={(e) => setProjectData({ ...projectData, skills: e.target.value })}
                            id="skills" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <input type="file" placeholder="Image"
                            onChange={onChange}
                            id="image" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 py-3 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <select type="text" placeholder="Duration"
                            value={projectData.duration}
                            onChange={(e) => setProjectData({ ...projectData, duration: e.target.value })}
                            id="duration" className='block bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-3 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required >
                            <option value="">
                                Select Duration
                            </option>
                            <option value="1 Week"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >1 Week</option>
                            <option value="2 Weeks"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >2 Weeks</option>
                            <option value="3 Weeks"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >3 Weeks</option>
                        </select>
                    </div>

                    {/* Button to submit the form */}
                    <div className='flex align-center justify-center'>
                        <button type="submit" className='block bg-sky-700 text-white text-lg font-bold rounded-xl px-2 py-3 mt-5 mb-2 mr-10 w-full focus:outline-none transition transform duration-100 ease-out' >Submit</button>
                    </div>


                </form>
            </div>
            <ToastContainer />

        </>

    )
}