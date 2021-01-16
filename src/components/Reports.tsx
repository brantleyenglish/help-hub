import React from "react";
import { ClientType } from "../../DataTypes";
import { useAssistance } from "../context/AssistanceContext";
import ReportSample from "../images/reportSample.png";

const Reports = () => {
  const { agencyAssistanceData } = useAssistance();

  const uniqueClients = React.useMemo(() => {
    const clients = agencyAssistanceData?.map((assistance) => {
      const date = new Date();
      const dobYear = assistance?.client?.dob.substr(
        assistance?.client?.dob?.length - 4
      );
      return {
        ...assistance?.client,
        age: date.getFullYear() - parseInt(dobYear),
      };
    });
    if (!clients) return [];

    let uniquesClientData: ClientType[] = [];
    for (const client of clients) {
      if (
        client?.id &&
        uniquesClientData.every(
          (uniqueClient) => uniqueClient?.id !== client?.id
        )
      ) {
        uniquesClientData?.push(client);
      }
    }
    return uniquesClientData;
  }, [agencyAssistanceData]);

  const reportData = React.useMemo(() => {
    return {
      total: uniqueClients?.length,
      counties: {
        carrollHenry: uniqueClients?.filter(
          (client) => client?.county === "Carroll" || client?.county === "Henry"
        )?.length,
        dyerLake: uniqueClients?.filter(
          (client) => client?.county === "Dyer" || client?.county === "Lake"
        )?.length,
        gibson: uniqueClients?.filter((client) => client?.county === "Gibson")
          ?.length,
        haywood: uniqueClients?.filter((client) => client?.county === "Haywood")
          ?.length,
        hendersonDecatur: uniqueClients?.filter(
          (client) =>
            client?.county === "Henderson" || client?.county === "Decatur"
        )?.length,
        Madison: uniqueClients?.filter((client) => client?.county === "Madison")
          ?.length,
        crockett: uniqueClients?.filter(
          (client) => client?.county === "Crockett"
        )?.length,
        hardeman: uniqueClients?.filter(
          (client) => client?.county === "Hardeman"
        )?.length,
        chester: uniqueClients?.filter((client) => client?.county === "Chester")
          ?.length,
        mcNairy: uniqueClients?.filter((client) => client?.county === "McNairy")
          ?.length,
        weakley: uniqueClients?.filter((client) => client?.county === "Weakley")
          ?.length,
        other: uniqueClients?.filter(
          (client) => client?.county === "Other / NA"
        )?.length,
      },
      gender: {
        male: uniqueClients?.filter((client) => client?.county === "Male")
          ?.length,
        female: uniqueClients?.filter((client) => client?.county === "Female")
          ?.length,
        transgender: uniqueClients?.filter(
          (client) => client?.county === "Transgender"
        )?.length,
        unknown: uniqueClients?.filter(
          (client) => client?.county === "Other/Not Reported"
        )?.length,
      },
      ethnicity: {
        white: uniqueClients?.filter(
          (client) => client?.county === "White/Caucasian"
        )?.length,
        hispanic: uniqueClients?.filter(
          (client) => client?.county === "Hipanic/Latinx"
        )?.length,
        black: uniqueClients?.filter(
          (client) => client?.county === "Black/African American"
        )?.length,
        other: uniqueClients?.filter(
          (client) =>
            client?.county === "Asian American" ||
            client?.county === "American Indian/Alaskan Native" ||
            client?.county === "Native Hawaiian/Pacific Islander" ||
            client?.county === "Other"
        )?.length,
      },
      age: {
        "6": uniqueClients?.filter((client) => client?.age && client?.age <= 6)
          ?.length,
        "13": uniqueClients?.filter(
          (client) => client?.age && client?.age > 6 && client?.age <= 13
        )?.length,
        "17": uniqueClients?.filter(
          (client) => client?.age && client?.age > 13 && client?.age <= 17
        )?.length,
        "30": uniqueClients?.filter(
          (client) => client?.age && client?.age > 17 && client?.age <= 30
        )?.length,
        "49": uniqueClients?.filter(
          (client) => client?.age && client?.age > 30 && client?.age <= 49
        )?.length,
        "64": uniqueClients?.filter(
          (client) => client?.age && client?.age > 49 && client?.age <= 64
        )?.length,
        "74": uniqueClients?.filter(
          (client) => client?.age && client?.age > 64 && client?.age <= 74
        )?.length,
        "84": uniqueClients?.filter(
          (client) => client?.age && client?.age > 74 && client?.age <= 84
        )?.length,
        "85": uniqueClients?.filter((client) => client?.age && client?.age > 84)
          ?.length,
        unknown: uniqueClients?.filter((client) => !client?.age)?.length,
      },
    };
  }, [uniqueClients]);

  return (
    <div>
      <h2>Reports is under construction!</h2>
      <p>
        That's where you guys, our beta testers, come in. Once there's enough
        data in the system, we'll be able to generate a report like the one
        below!
      </p>
      <img src={ReportSample} alt="" style={{ width: "100%" }} />
    </div>
  );
};

export default Reports;
