import React from "react";
import styled from "styled-components";
import { ClientType } from "../../DataTypes";
import { useAssistance } from "../context/AssistanceContext";
import getAge from "../utils/getAge";
import { theme } from "./Theme";

const ReportsWrapper = styled.div`
  max-width: 650px;
  margin: auto;
`;

const TotalNumber = styled.p`
  display: inline;
  font-size: 20px;
  color: ${theme.colors.yellow};
`;

const TableWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FlexTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  max-width: 300px;
  tr {
    color: ${theme.colors.white};
    background: ${theme.colors.lightBlue};
  }
  td {
    padding: 5px;
    border: 1px solid ${theme.colors.white};
  }
  td:last-child {
    width: 50px;
  }
  th {
    background: ${theme.colors.blue};
    text-align: left;
    padding: 5px;
    border: 1px solid ${theme.colors.white};
  }
`;

type ValueType = {
  label: string;
  count: number;
};

type CategoryDataType = {
  label: string;
  values: ValueType[];
};

type ReportDataType = CategoryDataType[];

const Reports = () => {
  const { agencyAssistanceData } = useAssistance();

  const uniqueClients = React.useMemo(() => {
    const clients = agencyAssistanceData?.map(
      (assistance) => assistance?.client
    );
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

  const countClients = React.useCallback(
    (options: string[], field: "county" | "gender" | "ethnicity") => {
      return uniqueClients?.filter(
        (client) => client[field] && options.includes(String(client[field]))
      ).length;
    },
    [uniqueClients]
  );

  const countClientByAge = React.useCallback(
    (startAge: number, endAge: number) => {
      return uniqueClients?.filter((client) => {
        const age = getAge(client?.dob);
        if (age >= startAge && age <= endAge) {
          return true;
        }
        return false;
      }).length;
    },
    [uniqueClients]
  );

  const reportData = React.useMemo<ReportDataType>(() => {
    return [
      {
        label: "Counties",
        values: [
          {
            label: "Carroll & Henry",
            count: countClients(["Carroll", "Henry"], "county"),
          },
          {
            label: "Dyer & Lake",
            count: countClients(["Dyer", "Lake"], "county"),
          },
          {
            label: "Gibson",
            count: countClients(["Gibson"], "county"),
          },
          {
            label: "Haywood",
            count: countClients(["Haywood"], "county"),
          },
          {
            label: "Henderson & Decatur",
            count: countClients(["Henderson", "Decatur"], "county"),
          },
          {
            label: "Madison",
            count: countClients(["Madison"], "county"),
          },
          {
            label: "Crockett",
            count: countClients(["Crockett"], "county"),
          },
          {
            label: "Hardeman",
            count: countClients(["Hardeman"], "county"),
          },
          {
            label: "Chester",
            count: countClients(["Chester"], "county"),
          },
          {
            label: "McNairy",
            count: countClients(["McNairy"], "county"),
          },
          {
            label: "Weakley",
            count: countClients(["Weakley"], "county"),
          },
          {
            label: "Other / NA",
            count: countClients(["Other / NA"], "county"),
          },
        ],
      },
      {
        label: "Age",
        values: [
          {
            label: "0-6",
            count: countClientByAge(0, 6),
          },
          {
            label: "7-13",
            count: countClientByAge(7, 13),
          },
          {
            label: "14-17",
            count: countClientByAge(14, 17),
          },
          {
            label: "18-30",
            count: countClientByAge(18, 30),
          },
          {
            label: "31-49",
            count: countClientByAge(31, 49),
          },
          {
            label: "50-64",
            count: countClientByAge(50, 64),
          },
          {
            label: "65-74",
            count: countClientByAge(65, 74),
          },
          {
            label: "75-84",
            count: countClientByAge(75, 84),
          },
          {
            label: "85+",
            count: countClientByAge(85, 200),
          },
        ],
      },
      {
        label: "Gender",
        values: [
          {
            label: "Male",
            count: countClients(["Male"], "gender"),
          },
          {
            label: "Female",
            count: countClients(["Female"], "gender"),
          },
          {
            label: "Transgender",
            count: countClients(["Transgender"], "gender"),
          },
          {
            label: "Other",
            count: countClients(["Other/Not Reported"], "gender"),
          },
        ],
      },
      {
        label: "Ethnicity",
        values: [
          {
            label: "White / Caucasian",
            count: countClients(["White"], "ethnicity"),
          },
          {
            label: "Hispanic / Latinx",
            count: countClients(["Hispanic/Latinx"], "ethnicity"),
          },
          {
            label: "Black / African American",
            count: countClients(["Black/African American"], "ethnicity"),
          },
          {
            label: "Other",
            count: countClients(
              [
                "Asian American",
                "American Indian/Alaskan Native",
                "Native Hawaiian/Pacific Islander",
                "Other",
                "Reported",
              ],
              "ethnicity"
            ),
          },
        ],
      },
    ];
  }, [countClients]);

  return (
    <ReportsWrapper>
      <p>
        You have served <TotalNumber>{uniqueClients?.length}</TotalNumber> total
        clients!
      </p>
      <TableWrapper>
        {reportData?.map((report) => (
          <FlexTable key={report?.label}>
            <tr>
              <th>{report?.label}</th>
            </tr>

            {report?.values?.map((value) => (
              <tr>
                <td>{value?.label}</td>
                <td>{value?.count}</td>
              </tr>
            ))}
          </FlexTable>
        ))}
      </TableWrapper>

      {/* <img src={ReportSample} alt="" style={{ width: "100%" }} /> */}
    </ReportsWrapper>
  );
};

export default Reports;
