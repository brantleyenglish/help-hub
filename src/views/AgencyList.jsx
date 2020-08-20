import React from "react";
import AgencySearch from "../components/agencyList/agencySearch";
import AgencyCard from "../components/agencyList/agencyCard";
import { Link } from "react-router-dom";

import { useAgency } from "../context/AgencyContext";

const AgencyList = () => {
  const { agencies } = useAgency();

  console.log({ agencies });

  return (
    <div>
      <AgencySearch />
      <div className="bckgrnd">
        {agencies &&
          agencies.map((agency) => (
            <Link to="/views/AgencyProfile" key={agency?.id}>
              <AgencyCard agency={agency} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AgencyList;
