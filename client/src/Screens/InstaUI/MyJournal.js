import React from "react";
import styled from 'styled-components';
import ControlFooter from "../../Components/ControlFooter";
import BackControl from "../../Components/BackControl";

const MyJournal = () => {
    return (
        <Container>
            <div className="main-content">
                <BackControl />
                <div className="title">My Travis Scott India Concert Experience</div>
                <div className="desc">
                    18 Oct, 2025 - Delhi
                </div>

                <div className="journal">
                    <img src="https://fi-cdn.vettix.org/e-462130-5863271.jpg" alt="" />

                    <div className="sub-desc">
                        I swear, nothing — and I mean *nothing* — prepared me for what I felt the night Travis touched down in India. It wasn’t just a concert; it was a cultural reset, a madness marathon, a main-character origin story. The kind of chaos that lives in group chats and memory lanes forever.
                    </div>

                    <div className="sub-desc">
                        I went in expecting loud music and maybe a story or two. What I got instead? Emotional whiplash, sweaty hugs from strangers, and the kind of high that didn’t need substances — just bass drops and lyrics that hit harder than heartbreak.
                    </div>

                    <div className="sub-title">From Refresh to Redemption</div>
                    <div className="sub-title-desc">
                        Had five tabs open, bank OTPs flying in, and my friends screaming in the background. Got one ticket after 47 minutes and two panic attacks. Felt like winning KBC, not gonna lie.
                    </div>

                    <div className="sub-title">Hyped, Broke, and Glowing</div>
                    <div className="sub-title-desc">
                        Spent 2 hours picking the right fit — ended up wearing my lucky tee and fake Travis merch. Uber bill hit me harder than Travis’ bass, but we move.
                    </div>

                    <div className="sub-title">God Tier Entrance</div>
                    <div className="sub-title-desc">
                        Lights cut. Bass dropped. Travis walked out like an anime protagonist. We screamed like bhakts at a temple. I felt my spine vibrate.
                    </div>

                    <div className="sub-title">One Shoe. No Regrets.</div>
                    <div className="sub-title-desc">
                        Mosh pit was straight-up *WWE meets EDM*. I went in with two shoes, came out with one, and a stranger’s phone number. Life-changing stuff.
                    </div>

                    <div className="sub-title">No Footage. Only Vibes.</div>
                    <div className="sub-title-desc">
                        Phone died halfway through “SICKO MODE”. But that moment? Locked in my brain with Dolby Atmos. Honestly, some memories hit harder unfiltered.
                    </div>

                    <div className="sub-title">Still Processing</div>
                    <div className="sub-title-desc">
                        Walking back alone, hoodie on, rewatching everything in my head. Could hear the bass echo in my bones. Realized I'd just lived a bucket-list moment.
                    </div>

                    <div className="sub-desc">
                        Even now, days later, I randomly smile thinking about it. Travis didn’t just perform — he left a mark. On my wallet, my shoes, and my soul.
                    </div>

                    <div className="sub-desc">
                        If you weren’t there? You missed history. If you were? You know exactly what I mean when I say — that night, we didn’t survive... we *raged*.
                    </div>
                </div>
            </div>
            <ControlFooter />
        </Container>
    );
};

export default MyJournal;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #000;

  margin-bottom: 64px;

  /* padding-bottom: 100px; */

  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  /* background-position: center; */
  /* background-attachment: fixed; */

  padding: 30px;

  display: flex;  
  flex-direction: column;
  align-items: center;

  .main-content{
      max-width: 500px;
      padding-top: 30px;

      position: relative;
      
      .title{
          font-size: 1.25rem;
          margin-top: 20px;
          font-weight: 500;
      }

      .desc{
          margin-top: 10px;
          font-weight: 200;
          font-size: 0.85rem;
      }


      .journal{
        margin-top: 30px;

        img{
            width: 100%;
            padding: 10px;
            padding-bottom: 30px;
            margin-bottom: 20px;
            background-color: white;
            transform: rotate(-2deg);
        }

        .sub-desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;
        }

        .sub-title{
            margin-top: 20px;
            font-weight: 500;
            font-size: 1rem;
        }

        .sub-title-desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;
            margin-left: 25px;
        }
      }

      .full-list{
        margin-top: 50px;

        .item{
          margin-top: 20px;
          border-bottom: 1px solid #313231;
          padding-bottom: 20px;
          
          label{
            display: flex;
            
            .item-title{
              margin-left: 10px;
              font-weight: 500;
            }
          }

          .completed-date{
            font-weight: 500;
            font-style: italic;
            font-size: 0.85rem;
            margin-left: 25px;
            margin: 10px 0 10px 25px;
          }

          .item-desc{
            /* margin-top: 10px; */
            font-weight: 200;
            font-size: 0.85rem;
            margin-left: 25px;
          }
        }
      }
  }
`