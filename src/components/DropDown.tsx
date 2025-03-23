import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontWeight, Text, TextColor } from "./Text";
import ChevronRight from "@/assets/chevron-right";
import ChevronDown from "@/assets/chevron-down";
import { COLOR, COMMON_STYLE } from "@/assets/common_css";

interface Props {
  data?: string[];
  onItemSelect?: (item: string) => void;
  initData?: string;
}

export default function Dropdown({ data, onItemSelect, initData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (initData) {
      setSelectedOption(initData);
    } else if (data?.length) {
      setSelectedOption(data[0]);
    }
  }, [initData, data]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectOption = useCallback(
    (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
      onItemSelect?.(option);
    },
    [onItemSelect]
  );

  return (
    <View style={[styles.dropdownContainer, isOpen && { height: 212 }]}>
      <TouchableOpacity
        style={[styles.dropdownButton, isOpen && styles.borderBottom]}
        onPress={toggleDropdown}
      >
        <Text style={styles.dropdownButtonText} fontWeight={FontWeight.BOLD}>
          {selectedOption}
        </Text>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </TouchableOpacity>

      {isOpen && data && (
        <View style={[COMMON_STYLE.flex1, styles.body]}>
          {data.map((item, index) => {
            const isActiveItem = item === selectedOption;
            return (
              <TouchableOpacity
                key={`${item}-${index}`}
                style={[
                  styles.item,
                  index === 0 && COMMON_STYLE.marginTop20,
                  index === data.length - 1 && COMMON_STYLE.marginBottom20,
                  isActiveItem && styles.selectedItem,
                ]}
                onPress={() => handleSelectOption(item)}
              >
                <Text color={isActiveItem ? TextColor.WHITE : TextColor.HEADER}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 15,
    width: "auto",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLOR.dropdown_border,
    height: 50,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: COLOR.button_border,
    borderRadius: 4,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  borderBottom: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  body: {
    paddingHorizontal: 18,
  },
  item: {
    height: 35,
    justifyContent: "center",
    backgroundColor: COLOR.un_select_option,
    paddingLeft: 15,
    marginTop: 10,
    borderRadius: 3,
  },
  selectedItem: {
    backgroundColor: COLOR.select_option,
  },
});
