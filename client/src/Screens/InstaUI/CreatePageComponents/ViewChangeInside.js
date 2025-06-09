import React from 'react';
import { useParams } from 'react-router-dom';
import InsideAnonymous from './InsideAnonymous';
import InsideFolder from './InsideFolder';
import InsideForm from './InsideForm';
import InsideWrite from './InsideWrite';

// Dummy components for each type — replace with your actual ones
const Subgroup = ({ data }) => <div>Subgroup: {data.title}</div>;
const RedirectLink = ({ data }) => <div>Redirect Link: {data.title}</div>;
const AnonymousReplies = ({ data }) => <div>Anonymous Replies: {data.title}</div>;
const FolderForRedirectLinks = ({ data }) => <div>Folder: {data.title}</div>;
const CustomForm = ({ data }) => <div>Custom Form: {data.title}</div>;
const MeetingScheduler = ({ data }) => <div>Meeting Scheduler: {data.title}</div>;
const WriteYourContent = ({ data }) => <div>Write Content: {data.title}</div>;

const ViewChangeInside = () => {
  const { id } = useParams();

  const items = JSON.parse(localStorage.getItem("userContentInfo") || "[]");
  const selectedItem = items.find(item => item.id === id);

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  switch (selectedItem.type) {
    case "Anonymous Replies":
      return <InsideAnonymous data={selectedItem}/>;
    case "Folder for Redirect Links":
      return <InsideFolder data={selectedItem} />;
    case "Custom Form":
      return <InsideForm data={selectedItem} />;
    case "Meeting Scheduler":
      return <InsideWrite data={selectedItem} />;
    case "Write your content":
      return <InsideWrite data={selectedItem} />;
    default:
      return <div>Unsupported type: {selectedItem.type}</div>;
  }
};

export default ViewChangeInside;
