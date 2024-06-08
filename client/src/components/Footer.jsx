import React from 'react';
import {Footer} from "flowbite-react";
import {Link} from "react-router-dom";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";

const FooterComp = () => {
    return (
        <Footer className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className=''>
                        <Link to='/' className='self-center whitespace-nowrap
            text-lg sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>Goitom</span> Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='about'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://legacy.reactjs.org/docs/getting-started.html'
                                             target='_blank'
                                             rel='noopener noreferrer'
                                >
                                    react js projects
                                </Footer.Link>
                            </Footer.LinkGroup>
                            <Footer.LinkGroup col>
                                <Footer.Link href='/about'
                                             target='_blank'
                                             rel='noopener noreferrer'
                                >
                                    Goitoms blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow us'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/goitommahtsentu'
                                             target='_blank'
                                             rel='noopener noreferrer'
                                >
                                    github
                                </Footer.Link>
                            </Footer.LinkGroup>
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'
                                >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='legal'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'
                                >
                                   privacy policy
                                </Footer.Link>
                            </Footer.LinkGroup>
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'
                                >
                                  Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-center">
                    <Footer.Copyright href='#' by='goitom blog' year={new Date().getFullYear()}/>
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitter}/>
                        <Footer.Icon href='https://github.com/goitommahtsentu/' icon={BsGithub}/>
                        <Footer.Icon href='#' icon={BsDribbble}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default FooterComp;
