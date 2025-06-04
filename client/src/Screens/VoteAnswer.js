import React, { useState } from "react";
import styled from "styled-components";

const VoteAnswer = () => {
    const characterOptions = [
        {
            name: "Joe Goldberg – You",
            img: "https://akns-images.eonline.com/eol_images/Entire_Site/2025030/rs_1200x1200-250130080312-you2.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top",
            votePercentage: 58,
        },
        {
            name: "Berlin – Money Heist",
            img: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/02/07222512/featured-money-heist.jpeg",
            votePercentage: 22,
        },
        {
            name: "Tyler Durden – Fight Club",
            img: "https://i.redd.it/vo03g2nkemmd1.jpeg",
            votePercentage: 10,
        },
        {
            name: "Ragnar Lothbrok – Vikings",
            img: "https://preview.redd.it/what-alignment-is-ragnar-lothbrok-from-vikings-v0-hjg8nbg6t7pc1.jpeg?auto=webp&s=91c9f10ca0d87e5291346b009f0f93074819a347",
            votePercentage: 10,
        },
        {
            name: "Otis Milburn – Sex Education",
            img: "https://cdn.costumewall.com/wp-content/uploads/2019/08/otis-milburn.jpg",
            votePercentage: 3,
        },
        {
            name: "Walter White – Breaking Bad",
            img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b51190101362045.5f1d68546ac50.jpg",
            votePercentage: 3,
        },
        {
            name: "Michael Scofield – Prison Break",
            img: "https://i.pinimg.com/736x/ac/f7/2f/acf72f3c8327e573a24d94f7c490d5e8.jpg",
            votePercentage: 2,
        },
        {
            name: "Sherlock Holmes – Sherlock",
            img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Benedict_Cumberbatch_filming_Sherlock_cropped2.jpg",
            votePercentage: 1,
        },
        {
            name: "Dexter Morgan – Dexter",
            img: "https://m.media-amazon.com/images/M/MV5BM2YwZjUwOTktNGE5NS00ZDU0LTk4NWYtMWY2NWZmZjg3YWU4XkEyXkFqcGc@._V1_.jpg",
            votePercentage: 1,
        },
        {
            name: "Thomas Shelby – Peaky Blinders",
            img: "https://cdn.webshopapp.com/shops/268192/files/433182622/tommy-shelby.jpg",
            votePercentage: 0,
        }
    ];


    const [selected, setSelected] = useState(null);

    return (
        <Container>
            <div className="main-content glass">
                <div className="title">Which character do I give vibes of?</div>
                <div className="desc">
                    Which character gives off my energy? 👀 Cast your vote — might just flex it on my profile.
                </div>

                {/* <div className="vote-options">
            <div className="vote-option">
                <div className="current-votes">52% Votes</div>
                <div className="img-holder"><img src="https://akns-images.eonline.com/eol_images/Entire_Site/2025030/rs_1200x1200-250130080312-you2.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top" alt="" /></div>
                <div className="right">
                    <div className="name">Joe Goldberg - You Netflix Series</div>
                    <div className="vote-btn">Vote</div>
                </div>
            </div>
        </div> */}

                <div className="vote-options">
                    {characterOptions.map((char, index) => (
                        <div className="vote-option" key={index}>
                            <div className="current-votes">{char.votePercentage}% Votes {index == 0 ? "🎉🏆" : ""}</div>
                            <div className="img-holder">
                                <img src={char.img} alt={char.name} />
                            </div>
                            
                            <div className="right">
                                <div className="name">{char.name}</div>
                                <div
                                    className={`vote-btn ${selected === index ? "selected" : ""}`}
                                    onClick={() => setSelected(index)}
                                >
                                    {selected === index ? "Voted" : "Vote"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default VoteAnswer;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    /* background-color: #333; */
    /* background-image: url('https://media0.giphy.com/media/4IlgE2iRukYIMbZsJZ/200w.gif?cid=82a1493bkue5enzruga0dznx3jz7dllsooyi1zkknv6pn3kp&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media4.giphy.com/media/YT4z922u0PlOHhoap2/200w.gif?cid=82a1493biu02p2az2bwfiwfoefie5fkywswq32j54a9hjslv&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media3.giphy.com/media/L1X6XcN2oxS08VrquP/giphy.gif?cid=6c09b952kh7p7oq0fwgeyinqxeaeiykmyvxtlulyyg3cr6m4&ep=v1_gifs_search&rid=giphy.gif&ct=g'); */
    /* background-image: url('https://cdn.dribbble.com/users/2773311/screenshots/14473889/media/91fad3184d4d4c377c32cba06da2d0a1.gif'); */
    background-image: url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/200w.gif?cid=82a1493bqjkhddxjr340tneezzrwuqsy9ld4pmddvavjwlip&ep=v1_gifs_related&rid=200w.gif&ct=g');
    
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    background-position: center;
    background-attachment: fixed;

    padding: 30px;

    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;

    .main-content{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: #3e3e3e;
        /* background: linear-gradient(135deg, #dfe9f3, #ffffff);  */
        /* min-height: calc(100vh - 150px); */
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        padding: 35px;

        .title{
            font-size: 1.25rem;
            margin-bottom: 10px;
            
        }

        .desc{
            margin-bottom: 10px;
            font-weight: 300;
            font-size: 0.9rem;
            color: #eae0e0;
        }

        .vote-options{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            
            .vote-option{
                width: 100%;
                padding: 10px;

                background-color: #f5f5f5;
                font-weight: 500;
                text-align: center;
                border-radius: 30px;
                color: #333;
                margin-bottom: 20px;

                display: flex; 
                align-items: center;
                justify-content: center;

                position: relative;

                .img-holder{
                    position: relative;
                    width: 50%;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                    display: grid;
                    place-items: center;
                    border-radius: 1000px;

                    img{
                        width: 100%;
                        height: 100%;
                    }
                }

                .current-votes{
                    position: absolute;
                    background-color: #e2e2a6;
                    border: 1.5px solid white;
                    top: -10px;
                    left: -10px;
                    border-radius: 30px;
                    z-index: 10;
                    
                    height: 30px;
                    padding: 0 10px;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.65rem;
                }

                .right{
                    width: 50%;
                    padding: 10px;
                    .name{
                        text-align: left;
                        color: #333;
                        font-size: 0.85rem;
                        font-weight: 600;
                        margin-bottom: 10px;
                    }

                    .vote-btn{
                        background-color: yellowgreen;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 15px 15px;
                        width: 100%;
                        border-radius: 30px;
                        text-align: center;
                    }
                }
            }
        }
    }

    .group-name-container{
        margin: 30px 0;
        padding: 0 35px;

        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        .group-name{
            font-size: 0.85rem;
            margin: 0 10px;
        }

        .group-name-container-line{
            height: 3px;
            border-radius: 100px;
            background-color:rgb(213, 209, 209);
            flex: 1;
        }
    }

    .glass {
        background: rgba(255, 255, 255, 0.2); /* Transparent white */
        border-radius: 16px; /* Rounded corners */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
        backdrop-filter: blur(10px); /* Background blur effect */
        -webkit-backdrop-filter: blur(10px); /* For Safari support */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for glass effect */
    }

    .join-us{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: whitesmoke;
        border-radius: 30px;
        height: 60px;
        margin-top: 30px;
    }
`