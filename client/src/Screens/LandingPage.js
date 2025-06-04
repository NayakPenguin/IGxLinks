import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import LinkIcon from '@material-ui/icons/Link';
import BuildIcon from '@material-ui/icons/Build';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import UpdateIcon from '@material-ui/icons/Update';

const fadeInFromLeft = keyframes`
    from {
        opacity: 1;
        transform: translateX(-100px);
    }
    to {
        opacity: 0.35;
        transform: translateX(0);
    }
`;

const fadeInFromRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(100px);
  }
  to {
    opacity: 0.35;
    transform: translateX(0);
  }
`;

const Counter = ({ endValue, duration = 1000 }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let start = 0;
        const increment = endValue / (duration / 10);

        const counter = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                start = endValue;
                clearInterval(counter);
            }
            setCount(Math.round(start));
        }, 10);

        return () => clearInterval(counter);
    }, [hasStarted, endValue, duration]);

    return <div className="value" ref={ref}>{count.toLocaleString()}</div>;
};

const LandingPage = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <Container>
            <Navbar>
                <div className="left">
                    <div className="logo">
                        OKDM.me
                    </div>
                </div>
                {/* <div className="middle no-mob">
                    Not visible
                </div> */}

                <div className="right">
                    <button className="btn btn-2">
                        Create your page
                    </button>

                    {/* <MenuIcon className="menu-btn no-lap" /> */}
                </div>
            </Navbar>

            <FocusContent>
                <div className="section-1 lap-section">
                    <div className="section-1-main">
                        <Image src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-schedule.webp&w=640&q=75" alt="" height="80px" style={{ top: '150px', left: '-120px' }} offset={offset * -1 * 0.1} angle="-10" heightLap="130px"/>
                        <Image src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-engage.webp&w=640&q=75" alt="" height="80px" style={{ top: '-15px' }} offset={offset * -1 * 0.2} direction="right" angle="3" heightLap="80px"/>
                        <Image src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-add-images.webp&w=640&q=75" alt="" height="100px" style={{ top: '230px', right: '-40px' }} offset={offset * -1 * 0.15} direction="right" angle="0" heightLap="130px"/>
                        <Image src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-analyze.webp&w=640&q=75" alt="" height="120px" style={{ bottom: '-30px', right: '-40px' }} offset={offset * -1 * 0.25} direction="right" angle="-10" heightLap="200px"/>
                        <Image src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-tag.webp&w=640&q=75" alt="" height="80px" style={{ bottom: '120px', left: '-40px' }} offset={offset * -1 * 0.18} angle="0" heightLap="150px"/>

                        <h3>Your Bio, Your Story - Go Beyond the Bio</h3>
                        <div className="desc">Share more, connect deeper, and showcase your world — all set up in just 5 minutes!</div>
                        <input type="text" className="email-input all-shadow" placeholder="Enter your email" />
                        <button className="btn btn-2 all-shadow">Get your page</button>
                        <div className="desc desc-2">By entering your email, you agree to receive emails from us.</div>
                    </div>
                </div>
                <div className="section-2 lap-section">
                    <div className="metric">
                        <Counter endValue={6795} />
                        <div className="metric-name">Active users</div>
                    </div>
                    <div className="metric">
                        <Counter endValue={1258881} />
                        <div className="metric-name">Total sections published</div>
                    </div>
                    <div className="metric">
                        <Counter endValue={182} />
                        <div className="metric-name">Influencers added</div>
                    </div>
                </div>
                <div className="section-3 lap-section">
                    <h3>Know the Features</h3>

                    <div className="section-3-container bg-1">
                        <div className="short-header">On 50K+ Pages</div>
                        <div className="header">Add All Your Favorite Links in One Place</div>
                        <div className="desc">
                            Showcase all your favorite platforms in a single link – from Instagram and LinkedIn to YouTube, Spotify, and more.
                            Make it easy for your audience to explore everything you love!
                        </div>
                        <div className="short-points">
                            <div className="short-point">
                                <LinkIcon />
                                <div className="text">Add unlimited links from Instagram, LinkedIn, YouTube, Spotify, and more</div>
                            </div>
                            <div className="short-point">
                                <BuildIcon style={{ "fontSize": "1.5rem" }} />
                                <div className="text">Fully customizable anytime – add images, change styles, and control visibility</div>
                            </div>
                            <div className="short-point">
                                <EqualizerIcon />
                                <div className="text">Track views, clicks, and engagement on your links</div>
                            </div>
                        </div>
                        <button className="btn">
                            Learn more
                            <TrendingFlatIcon />
                        </button>
                    </div>

                    <div className="section-3-container">
                        <div className="short-header">End-to-End Encrypted</div>
                        <div className="header">Collect Anonymous Feedback and Queries Easily</div>
                        <div className="desc">
                            Create customizable forms to gather anonymous feedback, handle queries, or get opinions on any topic – all through a single link.
                            Engage with your audience privately and effortlessly!
                        </div>
                        <div className="short-points">
                            <div className="short-point">
                                <VisibilityOffIcon />
                                <div className="text">Collect anonymous feedback and opinions securely</div>
                            </div>
                            <div className="short-point">
                                <AllInclusiveIcon />
                                <div className="text">Create unlimited forms for queries, feedback, and more</div>
                            </div>
                            <div className="short-point">
                                <BuildIcon style={{ "fontSize": "1.5rem" }} />
                                <div className="text">Fully customizable forms – edit fields, design, and privacy anytime</div>
                            </div>
                            <div className="short-point">
                                <EqualizerIcon />
                                <div className="text">Track responses, views, and engagement with real-time analytics</div>
                            </div>
                        </div>
                        <button className="btn">
                            Get Started Now
                            <TrendingFlatIcon />
                        </button>
                    </div>

                    <div className="section-3-container bg-2">
                        <div className="short-header">Showcase Your Personality</div>
                        <div className="header">Share Your Favorites – Music, Movies, and More</div>
                        <div className="desc">
                            Let your audience know more about you by sharing your current Spotify playlists, favorite movies, books, and your thoughts on them.
                            Build deeper connections by giving a glimpse into what inspires you!
                        </div>
                        <div className="short-points">
                            <div className="short-point">
                                <MusicNoteIcon />
                                <div className="text">Add your Spotify playlists for your audience to vibe with</div>
                            </div>
                            <div className="short-point">
                                <MovieIcon />
                                <div className="text">Share your favorite movies and shows along with your reviews</div>
                            </div>
                            <div className="short-point">
                                <ThumbsUpDownIcon />
                                <div className="text">Express your views on books, music, and more</div>
                            </div>
                        </div>
                        <button className="btn">
                            Start Sharing Now
                            <TrendingFlatIcon />
                        </button>
                    </div>

                    <div className="section-3-container">
                        <div className="short-header">Monetize Your Profile</div>
                        <div className="header">Sell Merchandise, Products, and Share Affiliate Links</div>
                        <div className="desc">
                            Turn your profile into a business hub by selling your own merchandise, digital products, or sharing affiliate links.
                            Boost your earnings while engaging with your audience seamlessly from one link!
                        </div>
                        <div className="short-points">
                            <div className="short-point">
                                <StorefrontIcon />
                                <div className="text">Sell your own merchandise and digital products easily</div>
                            </div>
                            <div className="short-point">
                                <MonetizationOnIcon />
                                <div className="text">Add affiliate links and earn commissions directly from your profile</div>
                            </div>
                            <div className="short-point">
                                <LoyaltyIcon />
                                <div className="text">Manage all your products and sales in one place</div>
                            </div>
                            <div className="short-point">
                                <TrendingUpIcon />
                                <div className="text">Track sales, clicks, and performance with built-in analytics</div>
                            </div>
                        </div>
                        <button className="btn">
                            Start Selling Today
                            <TrendingFlatIcon />
                        </button>
                    </div>

                    <div className="section-3-container bg-3">
                        <div className="short-header">Never Miss an Update</div>
                        <div className="header">Let Followers Stay Notified – On Web & WhatsApp</div>
                        <div className="desc">
                            Keep your audience engaged by allowing them to follow your page and receive real-time notifications whenever you post.
                            They’ll get up to 6 updates per month, directly on the website and WhatsApp.
                        </div>
                        <div className="short-points">
                            <div className="short-point">
                                <PersonAddIcon />
                                <div className="text">Let people follow your page and stay updated</div>
                            </div>
                            <div className="short-point">
                                <NotificationsActiveIcon />
                                <div className="text">Send real-time notifications on the website and WhatsApp</div>
                            </div>
                            <div className="short-point">
                                <UpdateIcon />
                                <div className="text">Limited to 6 updates per month to avoid spam</div>
                            </div>
                        </div>
                        <button className="btn">
                            Get Followers Now
                            <TrendingFlatIcon />
                        </button>
                    </div>

                </div>

                {/* <div className="section-4 lap-section">
                    <h3>About Us</h3>
                    <div className="section-4-container">
                        <div className="text">Whether you're a student, artist, entrepreneur, or influencer, anyone can create their own page and share their story. Let your followers know who you are, what you do, and what matters to you—all in one place!</div>
                    </div>
                </div> */}

                <Footer>
                    © 2025 OKDM. All rights reserved.
                </Footer>
            </FocusContent>
        </Container>
    )
}

export default LandingPage

const Container = styled.div`
    p, span, div, h1, h2, h3, h4, h5, h6, svg {
        color: #333;
        fill: #333;
    }

    .no-mob{
        @media (max-width: 1000px) {
            display: none;
        }
    }

    .no-lap{
        @media (min-width: 1001px) {
            display: none;
        }
    }

    .btn{
        font-size: 0.9rem;
        padding: 15px 25px;
        border-radius: 50px;
        border: 1px solid black;
        font-weight: 300;
    }

    .btn-2{
        color: black;
        background-color: #b0ec9c;
    }

    .all-shadow{
        -webkit-box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
        -moz-box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
        box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
    }

    .email-input{
        font-size: 0.9rem;
        padding: 15px 25px;
        border-radius: 50px;
        border: 1px solid black;
        font-weight: 300;
        color: #333;
    }
`

const Navbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    width: 100vw;
    padding: 15px;

    z-index: 100;

    background-color: #fffffa;
    border-bottom: 1px solid rgb(233, 229, 229);
    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;

    display: flex;  
    align-items: center;
    justify-content: space-between;

    .left{
        .logo{
            font-weight: 600;
            letter-spacing: 0.1rem;
            font-size: 1.15rem;
        }   
    }

    .right{
        display: flex;
        align-items: center;

        .menu-btn{
            margin-left: 10px;
            font-size: 1.75rem;
        }
    }   

    @media (min-width: 1001px) {
        padding: 15px 60px;
    }    
`

const FocusContent = styled.div`
    .section-1{
        margin-top: 80px;
        overflow: hidden;
        height: 600px;
        width: 100vw;
        padding: 20px;
        
        .section-1-main{
            position: relative;

            height: 100%;
            background-color: #f2f2e8;
            border-radius: 30px;
            padding: 30px;
            
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            h3{
                font-size: 2rem;
                font-weight: 600;
                text-align: center;
            }

            .desc{
                text-align: center;
                font-size: 1rem;
                font-weight: 400;

                margin-top: 20px;
            }

            .email-input{
                margin: 35px 0 10px 0;
                width: 90%;
                max-width: 700px;
            }

            .desc-2{
                font-size: 0.75rem;
                font-weight: 400;
                margin-top: 45px;

                color: hsl(180deg 4% 49.02%);
            }
        }

        @media (min-width: 1001px) {
            height: 700px;
        }
    }  
    
    .section-2{
        padding: 20px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .metric{
            position: relative;
            width: 100%;

            margin-bottom: 20px;
            padding: 30px;
            border-radius: 30px;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            background-color: white;
            border: 1px solid rgb(233, 229, 229);
            box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;


            .value{
                font-size: 2.5rem;
                font-weight: 500;
                letter-spacing: 0.15rem;
            }

            .metric-name{
                font-size: 0.85rem;
                font-weight: 300;
                text-transform: uppercase;
                letter-spacing: 0.10rem;
                margin-top: 10px;
            }

            @media (min-width: 1001px) {
                width: calc(33.33% - 13.33px);
            }
        }
    }

    .section-3{
        overflow: hidden;
        width: 100vw;
        padding: 20px;

        h3{
            font-size: 1.25rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .section-3-container{
            position: relative;

            min-height: 400px;
            background-color: #f2f2e8;
            border-radius: 30px;
            padding: 30px;
            margin-bottom: 20px;
            
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            /* justify-content: center; */

            .short-header{
                text-transform: uppercase;
                font-size: 0.7rem;
                letter-spacing: 0.1rem;
                font-weight: 400;
                padding: 5px 20px;
                border-radius: 20px;
                background-color: #e2e2c9;
                margin-bottom: 10px;
            }
            
            .header{
                font-size: 1.65rem;
                margin: 10px 0;
            }
            
            .desc{
                font-size: 0.9rem;
                font-weight: 300;
                letter-spacing: 0.07rem;
            }

            .short-points{
                .short-point{
                    display: flex;
                    align-items: center;
                    margin-top: 20px;

                    svg{
                        font-size: 2rem;
                        margin-right: 10px;
                        width: 40px;
                    }

                    .text{
                        font-size: 0.9rem;
                        font-weight: 300;
                        letter-spacing: 0.07rem;
                    }
                }
            }

            .btn{
                display: flex;
                align-items: center;

                padding: 12.5px 25px;
                margin-top: 30px;

                background-color: rgb(40 63 59);
                
                svg{
                    fill: white;
                    margin-left: 10px;
                    margin-right: -5px;
                }
            }
        }

        .bg-1{
        background-color: #c7efff;

            .short-header{
                background-color: #b5dae9;
            }
        }

        .bg-2{
            background-color: #b1ec9c;
            
            .short-header{
                background-color: #e6ffdd;
            }
        }

        .bg-3{
            background-color: #0bb8ff;

            .short-header{
                background-color: #60d0ff;
            }
        }

        .bg-4{
            background-color: orange;
        }
        
        .bg-5{
            background-color: orange;
        }
    } 
    
    .section-4{
        overflow: hidden;
        width: 100vw;
        padding: 20px;

        h3{
            font-size: 1.25rem;
            font-weight: 500;
            text-align: center;
            /* margin-bottom: 20px; */
        }
        
        .section-4-container{
            position: relative;

            border-radius: 30px;
            padding: 0 30px;
            margin-bottom: 20px;
            
            display: flex;
            /* flex-direction: column; */
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            img{
                width: 100%;
                /* border-radius: 30px; */
            }

            .text{
                font-size: 0.9rem;
                font-weight: 300;
                letter-spacing: 0.07rem;
                margin-top: 30px;
                text-align: center;
            }
        }
    } 

    .lap-section{
        @media (min-width: 1001px) {
            padding: 60px;
        }
    }
`

const Image = styled.img`
    position: absolute;
    opacity: 0.35;
    height: ${props => props.height || '80px'};
    transform: ${({ angle, offset }) => `rotate(${angle}deg) translateY(${offset}px)`};
    transition: transform 0.2s ease-out;
    animation: ${props => props.direction === 'right' ? fadeInFromRight : fadeInFromLeft} 1s ease-in-out;

    @media (min-width: 1001px) {
        height:  ${props => props.heightLap || '120px'};
    }
`;

const Footer = styled.div`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 300;
    letter-spacing: 0.07rem;
    padding-bottom: 20px;
`   