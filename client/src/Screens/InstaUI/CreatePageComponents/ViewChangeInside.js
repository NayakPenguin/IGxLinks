import React from 'react';
import { useParams } from 'react-router-dom';
import InsideAnonymous from './InsideAnonymous';
import InsideFolder from './InsideFolder';
import InsideForm from './InsideForm';
import InsideWrite from './InsideWrite';
import InsideMeeting from './InsideMeeting';

const MeetingScheduler = ({ data }) => <div>Meeting Scheduler: {data.title}</div>;

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
      return <InsideMeeting data={selectedItem} />;
    case "Write your content":
      return <InsideWrite data={selectedItem} />;
    default:
      return <div>Unsupported type: {selectedItem.type}</div>;
  }
};

export default ViewChangeInside;
