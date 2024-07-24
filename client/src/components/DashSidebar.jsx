import React, {useState} from 'react';
import {Sidebar} from "flowbite-react";
import {HiArrowSmRight, HiUser} from "react-icons/hi";
import {Link} from "react-router-dom";

const DashSidebar = () => {
    const [tab, setTab] = useState('');
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
               <Sidebar.ItemGroup>
                   <Link to='/dashboard/?tab=profile'>
                       <Sidebar.Item active={tab==='profile'} icon={HiUser} label='user' lblecolor='dark' as='div'>
                           profile
                       </Sidebar.Item>
                   </Link>

                   <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                       Sign out
                   </Sidebar.Item>
               </Sidebar.ItemGroup>
            </Sidebar.Items>
            
        </Sidebar>
    );
};

export default DashSidebar;
