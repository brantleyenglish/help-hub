import {
  faCaretDown,
  faCaretUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { theme } from "../components/Theme";

const DropdownWrapper = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
`;

const DropdownWrapperWrapper = styled.div<{ isFlex?: boolean }>`
  ${(p: any) => (p?.isFlex ? "flex: 4;" : "width: 100%;")}
`;

const DropdownContentWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  background: ${(p: any) => p.theme.colors.white};
  box-shadow: ${(p: any) => `0px 2px 4.65px ${p.theme.colors.grayLight}`};
  border: 1px solid ${(p: any) => p.theme.colors.blue};
  min-width: 143px;
  max-height: 200px;
  position: absolute;
  top: 32px;
  z-index: 99;
`;
const DropdownButtonWrapper: any = styled.button`
  width: 100%;
  padding: 8px 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: ${(p: any) => p.theme.colors.white};
  border: 1px solid ${(p: any) => p.theme.colors.blue};
  z-index: 9999999;
  margin: 0px;
  height: 44px;
`;
const DropdownContentButton: any = styled.button`
  width: 100%;
  padding: 6px 8px;
  background: ${(p: any) =>
    p.active ? p.theme.colors.grayLight : "transparent"};
  justify-content: center;
`;
const Overlay = styled.button`
  position: absolute;
  top: -99999999px;
  right: -99999999px;
  left: -99999999px;
  bottom: -99999999px;
  z-index: -1;
`;

const IconWrapper = styled.div`
  width: 50px;
  justify-content: center;
  align-items: center;
`;

const MultiRow: any = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  z-index: ${(p: any) => (p.zIndex ? p.zIndex : 1)};
`;

const ListingView = styled.div`
  display: flex;
  padding-top: 10px;
`;

const DeleteBtn = styled.button`
  width: 20px;
  height: 20px;
  padding-left: 5px;
`;

const FlexChild: any = styled.div`
  flex: ${(p: any) => (p.flex ? p.flex : "1")};
  align-items: flex-start;
  justify-content: flex-start;
`;

const Dropdown: React.FC<any> = ({
  name,
  options,
  placeholder,
  setFieldValue,
  defaultValue,
  multiSelect,
  multiSelectArray,
  isFlex,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeValue, setActiveValue] = React.useState<string>(defaultValue);
  const [activeLabel, setActiveLabel] = React.useState<string>(placeholder);
  const [multiSelectArr, setMultiSelectArr] = React.useState<any>(
    multiSelectArray
  );

  const updateSetFieldValue = React.useCallback(() => {
    if (multiSelect && name) {
      setFieldValue(name, multiSelectArr, true);
    } else if (setFieldValue && options && name) {
      setFieldValue(name, activeValue, true);
      const newLabel = options.find(
        (option: any) => option?.value?.toString() === activeValue?.toString()
      );
      setActiveLabel(newLabel ? newLabel?.label : activeValue);
    }
  }, [activeValue, setFieldValue, name, multiSelect, multiSelectArr]);

  React.useEffect(() => {
    updateSetFieldValue();
  }, [updateSetFieldValue]);

  const multiSelectOnPress = async (option: any) => {
    if (
      multiSelectArr &&
      (multiSelectArr?.length === 0 ||
        !multiSelectArr.some(
          (currentOptions: any) => currentOptions?.value === option.value
        ))
    ) {
      setMultiSelectArr([
        ...multiSelectArr,
        {
          value: option?.value,
          qty: 1,
        },
      ]);
    }
    setIsOpen(false);
  };

  const deleteMulti = (item: any) => {
    const filteredItems = multiSelectArr.filter((x: any) => x?.value !== item);
    setMultiSelectArr(filteredItems);
  };

  type DropDownOption = {
    label: string;
    value: any;
  };

  return (
    <DropdownWrapperWrapper isFlex={isFlex}>
      <DropdownWrapper>
        <DropdownButtonWrapper
          active={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <p color={theme.colors.gray}>{activeLabel}</p>
          <FontAwesomeIcon
            icon={isOpen ? faCaretUp : faCaretDown}
            color={theme.colors.gray}
          />
        </DropdownButtonWrapper>
      </DropdownWrapper>
      {multiSelectArr && (
        <ListingView key={`subdropdown-${name}`}>
          {multiSelectArr
            ?.sort((a: DropDownOption, b: DropDownOption) =>
              a?.value < b?.value ? -1 : a?.value > b?.value ? 1 : 0
            )
            ?.map((item: DropDownOption, index: number) => (
              <MultiRow key={`${item?.value}-${index}`} zIndex={99 - index}>
                <FlexChild flex={3}>
                  {item && (
                    <p key={item?.value} color={theme.colors.gray}>
                      {item?.value}
                    </p>
                  )}
                </FlexChild>
                <FlexChild flex={1}>
                  <DeleteBtn onClick={() => deleteMulti(item?.value)}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      color={theme.colors.blue}
                    />
                  </DeleteBtn>
                </FlexChild>
              </MultiRow>
            ))}
        </ListingView>
      )}
      {isOpen && (
        <DropdownContentWrapper>
          {options.map((option: any, index: number) => (
            <DropdownContentButton
              key={`${option.value}-${index}`}
              onClick={async () => {
                setIsOpen(false);

                setActiveValue(option.value);
              }}
            >
              <p color={theme.colors.gray}>{option.label}</p>
            </DropdownContentButton>
          ))}
          <Overlay onClick={() => setIsOpen(false)} />
        </DropdownContentWrapper>
      )}
      {isOpen && multiSelect && (
        <DropdownContentWrapper>
          {options.map((option: DropDownOption) => (
            <DropdownContentButton
              key={option.value}
              onClick={() => {
                multiSelectOnPress(option);
              }}
            >
              <p color={theme.colors.gray}>
                {option.label}
                <IconWrapper>
                  <FontAwesomeIcon icon={faPlus} color={theme.colors.blue} />
                </IconWrapper>
              </p>
            </DropdownContentButton>
          ))}
          <Overlay onClick={() => setIsOpen(false)} />
        </DropdownContentWrapper>
      )}
    </DropdownWrapperWrapper>
  );
};

export default Dropdown;
