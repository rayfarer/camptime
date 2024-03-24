import React from 'react'
import Login from '../components/Login/Login'
import video from '../assets/camptime.mp4'
export default function Root() {
    return (
        <>
            <div class="root-body" id="sidebar">
                <div class='hero-div'>
                    <h1 >Camptime</h1>
                    <p>An EverQuest mob timer<br></br> and (un)luckiness meter</p>
                    <Login />
                </div>
                <video id='background-video' className='videoTag' autoPlay loop muted>
                    <source src={video} type='video/mp4' />
                </video>
            </div>
        </>
    );
}