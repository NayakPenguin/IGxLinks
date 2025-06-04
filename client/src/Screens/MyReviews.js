import React, { useState } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" />);
    }
    while (stars.length < 5) {
        stars.push(<FaRegStar key={`empty-${stars.length}`} />);
    }
    return stars;
};

const movies = [
    {
        title: "The Substance",
        rating: 3.5,
        imgUrl: "https://acrn.com/wp-content/uploads/2024/10/the_substance-265285928-large.jpg",
        desc: "More like 3.5 but we’re being generous and rounding up to 4. Its connotations about ageism and the entire female rage trope are enjoyable - but it didn’t blow my mind because I consume a lot of written content about these, especially the earlier, already (I had a scared of getting older phase). I’m not a fan of gore so was Icked a little bit - love Margaret Qualley, no wonder the Maid was my favourite show in 2024."
    },
    {
        title: "Oppenheimer",
        rating: 4.5,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/250px-Oppenheimer_%28film%29.jpg",
        desc: "Visually stunning, heavy on dialogue, but Cillian Murphy carried the existential dread so well. A slow burn, but a worthy one."
    },
    {
        title: "Gully Boy",
        rating: 4,
        imgUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXMTEyIl9h8AArp8w2MeZgvE5rUb29r__fuy01fXDs_KfTpDGbsTz05TpVd2PyyfdbQnvPM1FC8duupkk7k-74PwXhQyxO-G2VkmmtsGdEK5OnYiRISFmG-FwsdxNLc8PuKQku/s1600/blog+-+2.jpg",
        desc: "Ranveer Singh killed it. The vibe, the underground rap scene, the hustle – everything felt raw and real."
    },
    {
        title: "Barbie",
        rating: 3,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
        desc: "Pretty but mid. Some parts were deep, others were just chaos in pink. Greta tried to say a lot at once."
    },
    {
        title: "Lunchbox",
        rating: 4.5,
        imgUrl: "https://m.media-amazon.com/images/S/pv-target-images/147832afd2d64f9c356fccd17d482dda31c201c6fe8fed86741700e111341275.jpg",
        desc: "Minimalistic but powerful storytelling. Irrfan Khan’s acting >>> everything else. Such a cozy, bittersweet watch."
    }
];

const MyReviews = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <Container>
            <div className="main-content glass">
                <div className="title">My Personal Takes on Cinema 🍿</div>
                <div className="desc">
                    Honest, chaotic, sometimes deep reviews of movies I watch—ranging from cinematic masterpieces to “I can’t believe I sat through that.”
                </div>

                <div className="group">
                    {movies.map((movie, index) => (
                        <div className="link-2" key={index}>
                            <div className="img-holder">
                                <img
                                    src={movie.imgUrl}
                                    alt="Movie Thumbnail"
                                />
                            </div>
                            <div className="title">{movie.title}</div>
                            <StarsWrapper>
                                {renderStars(movie.rating)}
                            </StarsWrapper>
                            <div className="desc">
                                {movie.desc.length > 100 ? (
                                    <>
                                        {expandedIndex === index ? movie.desc : `${movie.desc.slice(0, 100)}... `}
                                        <ReadMore onClick={() => toggleExpand(index)}>
                                            {expandedIndex === index ? "Read less" : "Read more"}
                                        </ReadMore>
                                    </>
                                ) : (
                                    movie.desc
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MyReviews

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    /* background-color: #333; */
    /* background-image: url('https://media0.giphy.com/media/4IlgE2iRukYIMbZsJZ/200w.gif?cid=82a1493bkue5enzruga0dznx3jz7dllsooyi1zkknv6pn3kp&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    background-image: url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/200w.gif?cid=82a1493bqjkhddxjr340tneezzrwuqsy9ld4pmddvavjwlip&ep=v1_gifs_related&rid=200w.gif&ct=g');
    /* background-image: url('https://www.shutterstock.com/shutterstock/videos/1104721753/thumb/1.jpg?ip=x480'); */
    
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
        min-height: calc(100vh - 150px);
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 35px;

        .logo-x-dp{
            height: 120px;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 50%;

            img{
                width: 100%;
            }
        }

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

        .name{
            margin-top: 20px;
            font-weight: 500;
            text-align: center;
        }

        .about-header{
            margin-top: 10px;
            font-weight: 500;
            font-size: 0.85rem;
            text-align: center;
        }

        .about-desc{
            margin-top: 5px;
            font-weight: 200;
            font-size: 0.85rem;
            text-align: center;
        }

        .main-btns{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .btn-1{
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #363636;
                border-radius: 10px;
                margin: 0 5px;
            }

            .trans{
                background-color: transparent;
            }
        }

        .socials{
            margin-top: 30px;
            display: flex; 
            align-items: center; 
            justify-content: center;
            flex-wrap: wrap;

            .social-icon{
                height: 35px;
                aspect-ratio: 1/1;
                background-color: #363636;
                border-radius: 50%;
                margin: 2.5px;

                padding: 2.5px;

                img{
                    width: 100%;
                    border-radius: 100px;
                }
            }
        }

        .group{
            width: 100%;

            .group-name-container{
                margin: 30px 0;
                padding: 0 35px;

                display: flex;
                align-items: center;
                justify-content: center;

                .group-name{
                    font-size: 0.85rem;
                    margin: 0 10px;
                    text-align: center;
                }

                .group-name-container-line{
                    min-width: 20px;
                    height: 3px;
                    border-radius: 100px;
                    background-color: #676363;
                    flex: 1;
                }
            }

            .link1{
                background-color: #f5f5f5;
                font-size: 0.75rem;
                font-weight: 500;
                text-align: center;
                padding: 15px 30px;
                border-radius: 100px;
                color: #333;
                margin-bottom: 5px;

                display: flex; 
                align-items: center;
                justify-content: center;

                height: 60px;

                position: relative;

                .link-circle{
                    position: absolute;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;

                    background-color: #d9dfef;

                    right: -10px;

                    display: grid;
                    place-items: center;

                    svg{
                        font-size: 1rem;
                        fill: #333;
                    }
                }

            }

            .link-2{
                background-color: #f5f5f5;
                
                padding: 30px;
                border-radius: 30px;
                color: #333;
                margin-bottom: 5px;
                margin-top: 30px;

                display: flex; 
                align-items: center;
                flex-direction: column;

                .img-holder{
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                    display: grid;
                    place-items: center;
                    border-radius: 30px;

                    img{
                        width: 100%;
                        height: 100%;
                    }
                }

                .image-btns{
                    position: absolute;
                    width: calc(100% + 30px);
                    display: flex;
                    justify-content: space-between;
                    top: calc(50% - 15px);
                    margin-left: -15px;
                    border-radius: 100px;

                    button{
                        height: 30px;
                        width: 30px;
                        border-radius: 100px;
                        border: 1px solid #e5e5e5;
                        background-color: white;
                        display: grid;
                        place-items: center;

                        svg{
                            fill: #333;
                        }
                    }
                }

                .tags{
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    .price{
                        background-color: yellowgreen;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 5px 10px;
                        border-radius: 100px;
                        margin-right: 5px;
                    }
                    
                    .tag{
                        background-color: pink;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 5px 10px;
                        border-radius: 100px;
                        margin-right: 5px;
                    }
                }

                .title{
                    color: #333;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-top: 10px;
                    width: 100%;
                }

                .desc{
                    color: #333;
                    font-size: 0.75rem;
                    font-weight: 300;
                    margin-top: 10px;
                    width: 100%;
                }

                .date{
                    color: #333;
                    font-size: 0.65rem;
                    font-weight: 300;
                    margin-top: 10px;
                    width: 100%;
                    font-weight: 500;
                }

                .buy-btn{
                    margin-top: 10px;
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

const StarsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: #f5c518; /* IMDb star color */
  
  svg{
    font-size: 16px;
    fill: #f5c518; /* IMDb star color */
  }
`;


const ReadMore = styled.span`
    color: #0077ff;
    cursor: pointer;
    margin-left: 5px;
    font-weight: 400;
    font-size: 0.75rem;
`;