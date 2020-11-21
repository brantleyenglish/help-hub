import React from "react";
import styled from "styled-components";

const DateInputField = styled.input`
  padding: 5px;
  font-size: 12px;
  flex: 1;
  margin: 0px 15px;
`;

const checkValue = (str: string, max: number) => {
  if (str.charAt(0) !== "0" || str === "00") {
    var num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) num = 1;
    str =
      num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
        ? "0" + num
        : num.toString();
  }
  return str;
};

const parseInput = (input: string) => {
  if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
  var values = input.split("/").map(function (v) {
    return v.replace(/\D/g, "");
  });
  if (values[0]) values[0] = checkValue(values[0], 12);
  if (values[1]) values[1] = checkValue(values[1], 31);
  var output = values.map(function (v, i) {
    return v.length === 2 && i < 2 ? v + " / " : v;
  });
  return output.join("").substr(0, 14);
};

const parseBlur = (input: string) => {
  var values = input.split("/").map(function (v: string, i: number) {
    return v.replace(/\D/g, "");
  });
  var output = "";

  if (values.length === 3) {
    var year =
      values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
    var month = parseInt(values[0]) - 1;
    var day = parseInt(values[1]);
    var d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
      output = dates
        .map(function (v: number) {
          const value = v.toString();
          return value.length === 1 ? "0" + value : value;
        })
        .join(" / ");
    }
  }
  return output;
};

type DateInputType = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const DateInput: React.FC<DateInputType> = ({ setValue }) => {
  const [parsedDate, setParsedDate] = React.useState<string>("");

  React.useEffect(() => {
    setValue(parsedDate);
  }, [parsedDate]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const value = e.target.value;
    const newValue = parseInput(value);
    setParsedDate(newValue);
  };

  const handleBlur = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const value = e.target.value;
    const newValue = parseBlur(value);
    setParsedDate(newValue);
  };

  return (
    <DateInputField
      onChange={handleChange}
      value={parsedDate}
      onBlur={handleBlur}
      placeholder="Date of Birth - ## / ## / ####"
    />
  );
};

export default DateInput;