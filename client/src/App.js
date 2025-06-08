import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Screens/Landing";
import UserArya from "./Screens/UserArya";
import TemplateTesting from "./Screens/TemplateTesting";
import LandingPage from "./Screens/LandingPage";
import Dashboard from "./Screens/Dashboard";
import GetAnswers1 from "./Screens/GetAnswers1";
import VoteAnswer from "./Screens/VoteAnswer";
import MyReviews from "./Screens/MyReviews";
import UserProfile from "./Screens/InstaUI/UserProfile";
import GetReplies from "./Screens/InstaUI/GetReplies";
import GetVotes from "./Screens/InstaUI/GetVotes";
import MyList from "./Screens/InstaUI/MyList";
import MyJournal from "./Screens/InstaUI/MyJournal";
import BrandProfile from "./Screens/InstaUI/BrandProfile";
import Shop from "./Screens/InstaUI/Shop";
import Influencer from "./Screens/InstaUI/Influencer";
import Form from "./Screens/InstaUI/Form";
import NewShop from "./Screens/InstaUI/NewShop";
import BasicUser from "./Screens/InstaUI/BasicUser";
import BasicUser2 from "./Screens/InstaUI/BasicUser2";
import CreateYourPage from "./Screens/InstaUI/CreatePageComponents/CreateYourPage";
import ViewChanges from "./Screens/InstaUI/CreatePageComponents/ViewChanges";
import CreateMeetings from "./Screens/InstaUI/CreatePageComponents/CreateMeetings";
import CreateForm from "./Screens/InstaUI/CreatePageComponents/CreateForm";

const App = () => {
  return (
    <Container>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<UserProfile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/brand" element={<BrandProfile />} />
        <Route path="/influencer" element={<Influencer />} />
        <Route path="/influencer/form" element={<Form />} />
        <Route path="/influencer/shop" element={<NewShop />} />
        <Route path="/basicuser" element={<BasicUser />} />
        <Route path="/basicuser2" element={<BasicUser2 />} />
        <Route path="/page/create" element={<CreateYourPage />} />
        <Route path="/page/view-edit" element={<ViewChanges />} />
        <Route path="/page/meeting/:id" element={<CreateMeetings />} />
        <Route path="/page/form/:id" element={<CreateForm />} />
        
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/getreplies" element={<GetReplies />} />
        <Route path="/user/getvotes" element={<GetVotes />} />
        <Route path="/user/mylist" element={<MyList />} />
        <Route path="/user/myjournal" element={<MyJournal />} />

        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/votes" element={<VoteAnswer />} />
        <Route path="/user/getvalues" element={<GetAnswers1 />} />
        <Route path="/@mrungreat" element={<UserArya />} />
        <Route path="/mrungreat" element={<UserArya />} />
        <Route path="/@nayakpenguin" element={<Landing />} />
        <Route path="/nayakpenguin" element={<Landing />} />
        <Route path="/testing" element={<TemplateTesting />} />
      </Routes>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`