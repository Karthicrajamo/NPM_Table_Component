import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox } from "react-native-paper";
import commonStyles from "./commonStyles"; // ✅ make sure to put commonStyles.ts in the same folder

const { width } = Dimensions.get("window");
const isMobile = width < 768;

export interface SimpleTableProps {
  headers: string[];
  tableData: any[][];
  highlightVal?: string[];
  heading?: string;
  exclude?: string[];
  tableDataContainerStyle?: StyleProp<ViewStyle>;
  setActive?: (data: Record<string, any>) => void;
  checkboxHeaders?: string[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  tableData,
  highlightVal = [],
  heading = "",
  exclude = [],
  tableDataContainerStyle,
  setActive,
  checkboxHeaders = [],
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const filteredHeaders = headers.filter((header) => !exclude.includes(header));
  const filteredIndexes = headers
    .map((header, i) => (!exclude.includes(header) ? i : -1))
    .filter((i) => i !== -1);

  const columnWidths = filteredHeaders.map((header) =>
    Math.max(header.length * 10, 120)
  );

  const getCellStyle = (header: string) =>
    highlightVal.includes(header)
      ? [styles.dataCell, styles.highlightCell]
      : styles.dataCell;

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {filteredHeaders.map((header, index) => (
        <View
          key={`header-${header}-${index}`}
          style={[styles.cellContainer, { width: columnWidths[index] }]}
        >
          <Text
            style={[styles.headerCell, { width: columnWidths[index] }]}
            maxFontSizeMultiplier={1.2}
          >
            {header}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderRows = () =>
    tableData.length > 0 ? (
      tableData.map((row, rowIndex) => {
        const rowData: Record<string, any> = {};
        headers.forEach((header, i) => {
          rowData[header] = row[i];
        });

        const isSelected = rowIndex === selectedRowIndex;

        const rowContent = (
          <View
            style={[
              styles.dataRow,
              isSelected && setActive ? styles.selectedRow : undefined,
            ]}
          >
            {filteredIndexes.map((colIndex, i) => {
              const value = row[colIndex];
              const header = filteredHeaders[i];
              const isBooleanLike = [
                "true",
                "false",
                "Y",
                "N",
                true,
                false,
                0,
                1,
              ].includes(value);

              const shouldRenderCheckbox =
                checkboxHeaders.length > 0
                  ? checkboxHeaders.includes(header)
                  : colIndex === filteredIndexes[filteredIndexes.length - 1];

              return (
                <View
                  key={`cell-${rowIndex}-${i}`}
                  style={[styles.cellContainer, { width: columnWidths[i] }]}
                >
                  {isBooleanLike && shouldRenderCheckbox ? (
                    <Checkbox
                      status={
                        ["true", "Y", true, 1].includes(value)
                          ? "checked"
                          : "unchecked"
                      }
                      disabled
                    />
                  ) : (
                    <Text
                      style={[
                        getCellStyle(header),
                        { width: columnWidths[i], color: "black" },
                      ]}
                      maxFontSizeMultiplier={1.2}
                    >
                      {value}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );

        if (setActive) {
          const orderedData: Record<string, any> = {};
          filteredHeaders.forEach((header, i) => {
            const colIndex = headers.indexOf(header);
            orderedData[header] = row[colIndex];
          });

          return (
            <TouchableOpacity
              key={`row-${rowIndex}`}
              onPress={() => {
                setSelectedRowIndex(rowIndex);
                setActive(orderedData);
              }}
            >
              {rowContent}
            </TouchableOpacity>
          );
        } else {
          return <View key={`row-${rowIndex}`}>{rowContent}</View>;
        }
      })
    ) : (
      <View style={styles.dataRow}>
        <Text
          style={[styles.dataCell, styles.noDataCell]}
          maxFontSizeMultiplier={1.2}
        >
          No data available
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {heading ? (
        <Text style={commonStyles.heading} maxFontSizeMultiplier={1.2}>
          {heading}
        </Text>
      ) : null}

      <ScrollView horizontal persistentScrollbar showsHorizontalScrollIndicator>
        <View style={styles.tableContainer}>
          {renderHeader()}
          <ScrollView
            style={[styles.scrollableBody, tableDataContainerStyle]}
            persistentScrollbar
            nestedScrollEnabled
          >
            {renderRows()}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 2,
    paddingHorizontal: 10,
  },
  tableContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollableBody: {
    maxHeight: 250,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#3788E5",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  headerCell: {
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: isMobile ? 12 : 14,
    color: "#fff",
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedRow: {
    backgroundColor: "#D6E9FF",
  },
  dataCell: {
    color: "black",
    padding: 10,
    fontSize: isMobile ? 14 : 16,
    textAlign: "center",
    borderRightColor: "#ddd",
  },
  highlightCell: {
    color: "blue",
    fontWeight: "bold",
  },
  cellContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1.5,
    borderRightColor: "#ddd",
  },
  noDataCell: {
    width: "100%",
    textAlign: "center",
  },
});

export default SimpleTable;
