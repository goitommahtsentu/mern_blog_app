import React, {useState} from 'react';
import {Sidebar} from "flowbite-react";
import {HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from "react-icons/hi";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const DashSidebar = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard/?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser}
                                      label={currentUser.isAdmin ? 'Admin' : 'User'} lblecolor='dark' as='div'>
                            profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin &&
                        (<Link to='/dashboard/?tab=posts'>
                            <Sidebar.Item as='div'
                                          active={tab === 'posts'}
                                          icon={HiDocumentText}>
                                posts
                            </Sidebar.Item>
                        </Link>)}

                    {currentUser.isAdmin && (
                        <>
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                    active={tab === 'users'}
                                    icon={HiOutlineUserGroup}
                                    as='div'
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item
                                    active={tab === 'comments'}
                                    icon={HiAnnotation}
                                    as='div'
                                >
                                    Comments
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>

        </Sidebar>
    );
};

export default DashSidebar;
