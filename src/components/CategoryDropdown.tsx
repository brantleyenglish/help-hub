import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { CategoryType } from "../../DataTypes";
import { theme } from "../components/Theme";
import { usePublicData } from "../context/PublicContext";

const StyledFormikFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  color: ${theme.colors.gray};
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
type CategoryDropdown = {
  setCategories: (categories: string[]) => void;
};

const CategoryDropdown: React.FC<CategoryDropdown> = ({ setCategories }) => {
  const { categories } = usePublicData();
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    setCategories(selected);
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
      <label htmlFor="catgeory">Categories</label>
      <select
        value="categories"
        onChange={(e) => {
          e?.preventDefault();
          handleSelectChange(e?.target?.value);
        }}
      >
        <option value="categories">Catgeory Options</option>
        {categories &&
          categories?.map((option: CategoryType) => (
            <option value={option?.name} key={option?.name}>
              {option?.label}
            </option>
          ))}
      </select>
      <CategoryWrapper>
        {selected?.map((selectedCat: string) => (
          <StyledButton
            onClick={() => removeSelected(selectedCat)}
            key={selectedCat}
          >
            {selectedCat} <FontAwesomeIcon icon={faTimes} />
          </StyledButton>
        ))}
      </CategoryWrapper>
    </StyledFormikFieldWrapper>
  );
};

export default CategoryDropdown;
