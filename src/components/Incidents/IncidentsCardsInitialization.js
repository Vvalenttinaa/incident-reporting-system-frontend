import React from "react";
import IncidentsCards from "./IncidentsCards"; // Import the IncidentsCards component

const IncidentsCardsInitialization = () => {
  const data = [
    { id: 1, type: "incident1", subtype: "podtip1", description: "fioajfioajfoiafio", imageUrl: "url1", isApproved: false },
    { id: 2, type: "incident2", subtype: "podtip22", description: "description2", imageUrl: "url2", isApproved: true },
    { id: 3, type: "incident3", subtype: "podtip333", description: "description3", imageUrl: "url3", isApproved: false },
  ];

  return (
    <div>
      <IncidentsCards data={data} /> {/* Pass your data to the IncidentsCards component */}
    </div>
  );
};

export default IncidentsCardsInitialization;
