import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Screens/Landing";
import UserArya from "./Screens/UserArya";
import TemplateTesting from "./Screens/TemplateTesting";
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
import CreateRedirect from "./Screens/InstaUI/CreatePageComponents/CreateRedirect";
import CreateWrite from "./Screens/InstaUI/CreatePageComponents/CreateWrite";
import ViewChangeInside from "./Screens/InstaUI/CreatePageComponents/ViewChangeInside";
import Notification from "./Screens/InstaUI/Notification/Notification";
import Engagement from "./Screens/InstaUI/Engagement/Engagement";
import Profile from "./Screens/InstaUI/Profile/Profile";
import TermsOfService from "./Screens/InstaUI/OrgLegal/TermsOfService";
import PrivacyPolicy from "./Screens/InstaUI/OrgLegal/PrivacyPolicy";
import CookiePolicy from "./Screens/InstaUI/OrgLegal/CookiePolicy";
import Disclaimer from "./Screens/InstaUI/OrgLegal/Disclaimer";
import ContentGuidelines from "./Screens/InstaUI/OrgLegal/ContentGuidelines";
import Login from "./Screens/LoginPages/Login";
import AfterLogin from "./Screens/LoginPages/AfterLogin";
import BetweenCalcPage from "./Screens/InstaUI/BetweenCalcPage";

import PrivateRoute from './auth/PrivateRoute'; 
import ViewProfile from "./Screens/InstaUI/ViewProfile";
import ViewProfileInsideControl from "./Screens/InstaUI/ViewProfileInside/ViewProfileInsideControl";

const App = () => {
  return (
    <Container>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/basic-info" element={<AfterLogin />} />
        <Route path="/wait" element={<BetweenCalcPage />} />
        <Route path="/p/:username" element={<ViewProfile />} />
        <Route path="/p/:username/:id" element={<ViewProfileInsideControl />} />


        <Route path="/shop" element={<Shop />} />
        <Route path="/brand" element={<BrandProfile />} />
        <Route path="/influencer" element={<Influencer />} />
        <Route path="/influencer/form" element={<Form />} />
        <Route path="/influencer/shop" element={<NewShop />} />
        <Route path="/basicuser" element={<BasicUser />} />
        <Route path="/basicuser2" element={<BasicUser2 />} />
        
        {/* private below  */}
        <Route path="/page/create" element={<PrivateRoute><CreateYourPage /></PrivateRoute>} />
        <Route path="/page/view-edit" element={<PrivateRoute><ViewChanges /></PrivateRoute>} />
        <Route path="/page/meeting/:id" element={<PrivateRoute><CreateMeetings /></PrivateRoute>} />
        <Route path="/page/form/:id" element={<PrivateRoute><CreateForm /></PrivateRoute>} />
        <Route path="/page/folder/:id" element={<PrivateRoute><CreateRedirect /></PrivateRoute>} />
        <Route path="/page/write/:id" element={<PrivateRoute><CreateWrite /></PrivateRoute>} />
        <Route path="/page/view-edit/:id" element={<PrivateRoute><ViewChangeInside /></PrivateRoute>} />
        <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path="/engagement" element={<PrivateRoute><Engagement /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        {/* private end */}

        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/content-guidelines" element={<ContentGuidelines />} />
        
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