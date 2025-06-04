import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ControlFooter from "../../Components/ControlFooter";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackControl from "../../Components/BackControl";


const publicBucketList = [
  {
    title: "Solo Trip to the Mountains",
    completed: true,
    completedOn: "15 Oct 2024",
    desc: "Booked a random ticket to Himachal, hiked till my legs gave up, made friends with a dog named Whiskey, and watched the stars alone at 2 AM. Peak main-character energy."
  },
  {
    title: "Skydiving",
    completed: true,
    completedOn: "05 Feb 2025",
    desc: "Was terrified till the moment I jumped, then felt more alive than ever. 10/10 would jump out of a plane again."
  },
  {
    title: "Get a Tattoo",
    completed: false,
    completedOn: null,
    desc: ""
  },
  {
    title: "Attend a Music Festival",
    completed: true,
    completedOn: "02 Dec 2024",
    desc: "Screamed my lungs out at NH7 Weekender, lost my voice but found my rhythm. Camped out with strangers who felt like old friends."
  },
  {
    title: "Try a 3AM Street Food Tour",
    completed: true,
    completedOn: "12 Jan 2025",
    desc: "Hit every momo, chaap, and roll joint in Delhi post-midnight. Regret nothing. Except maybe the stomach ache next morning."
  },
  {
    title: "Learn to Surf",
    completed: false,
    completedOn: null,
    desc: ""
  },
  {
    title: "Crash a Wedding (and Dance)",
    completed: true,
    completedOn: "08 Nov 2024",
    desc: "Snuck into a Punjabi wedding with a friend. Ate like a king, danced like no one was watching. No regrets, just vibes."
  }
];

const sortedBucketList = [...publicBucketList].sort((a, b) => {
  return b.completed - a.completed;
});

const MyList = () => {
  return (
    <Container>
      <div className="main-content">
        <BackControl />
        <div className="title">Public Bucket List</div>
        <div className="desc">Public Bucket List? It’s my open journal of chaos, thrill, and dopamine hits. Just a 22-year-old ticking off all the wild, wholesome, and ‘tell-my-grandkids’ kind of moments. If I’ve done it, you’ll know how it went. If I haven’t, stay tuned — it’s coming.</div>

        <div className="full-list">
          {sortedBucketList.map((item, index) => (
            <div className="item" key={index}>
              <label>
                <input type="checkbox" checked={item.completed} readOnly />
                <div className="item-title">{item.title}</div>
              </label>
              {item.completed && (
                <>
                  <div className="completed-date">{item.completedOn}</div>
                  <div className="item-desc">{item.desc}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <ControlFooter />
    </Container>
  )
}

export default MyList

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