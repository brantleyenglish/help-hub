import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";

const StyledFormikFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  color: ${theme.colors.gray};
  p{
    text-align: left;
    padding:5px 0px;
    margin: 0px;
  }
  label {
    color: ${theme.colors.lightBlue};
    text-align: left;
  }
  select {
    border-radius: 4px;
    padding: 5px;
    border: none;
    margin-top: 5px;
    background: ${theme.colors.grayLight};
  }
`;

const StyledButton = styled.button`
  color: ${theme.colors.gray};
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 20px 20px 0px;
  &:hover {
    color: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;
type CountyDropdown = {
  setCounties: (counties: string[]) => void;
  defaultCounties: string[];
};

const CategoryDropdown: React.FC<CountyDropdown> = ({
  setCounties,
  defaultCounties,
}) => {
  const { counties } = usePublicData();
  const [selected, setSelected] = React.useState<string[]>(defaultCounties);

  React.useEffect(() => {
    setCounties(selected);
  }, [selected]);

  const handleSelectChange = (value: string) => {
    if (!selected?.includes(value)) {
      setSelected([...selected, value]);
    } else {
      setSelected(
        selected?.filter((selectedCat: string) => selectedCat !== value)
      );
    }
  };

  const removeSelected = (value: string) => {
    setSelected(
      selected?.filter((selectedCat: string) => selectedCat !== value)
    );
  };

  return (
    <StyledFormikFieldWrapper>
      <label htmlFor="counties">Counties</label>
      <p>Select counties one at a time from the drop-down to add them. To remove a county, click the 'x.'</p>
      <select
        value="counties"
        onChange={(e) => {
          e?.preventDefault();
          handleSelectChange(e?.target?.value);
        }}
      >
        <option value="counties">Active Counties</option>
        {counties &&
          counties?.map((option: string, index: number) => (
            <option value={option} key={`${option}-${index}`}>
              {option}
            </option>
          ))}
      </select>
      <CategoryWrapper>
        {selected?.map((selectedCat: string, index: number) => (
          <StyledButton
            onClick={() => removeSelected(selectedCat)}
            key={`${selectedCat}-${index + 99}`}
          >
            {selectedCat} <FontAwesomeIcon icon={faTimes} />
          </StyledButton>
        ))}
      </CategoryWrapper>
    </StyledFormikFieldWrapper>
  );
};

export default CategoryDropdown;
