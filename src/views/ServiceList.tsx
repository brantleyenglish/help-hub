import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/serviceList/serviceCard";
import ServHeader from "../components/serviceList/serviceSearch";
import { usePublicData } from "../context/PublicContext";

const ServiceList = () => {
  const { allServices } = usePublicData();

  console.log({ allServices });
  return (
    <div>
      <ServHeader />
      {allServices &&
        allServices.map((service: any) => (
          <Link to={`/services/${service?.id}`} key={service.id}>
            <ServiceCard service={service} />
          </Link>
        ))}
    </div>
  );
};

export default ServiceList;
