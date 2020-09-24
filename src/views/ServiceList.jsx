import React from "react";
import ServHeader from "../components/serviceList/serviceSearch";
import ServProf from "../components/serviceList/serviceCard";
import { Link } from "react-router-dom";

import { usePublicData } from "../context/PublicContext";
const ServiceList = () => {
  const { allServices } = usePublicData();

  console.log({ allServices });
  return (
    <div>
      <ServHeader />
      {allServices &&
        allServices.map((service) => (
          <Link to={`/services/${service?.id}`}>
            <ServProf key={service.id} />
          </Link>
        ))}
    </div>
  );
};

export default ServiceList;
