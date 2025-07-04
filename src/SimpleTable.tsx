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

const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  tableData,
  highlightVal = [],
  heading,
  exclude = [],
  tableDataContainerStyle,
  setActive,
  checkboxHeaders = [],
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const filteredHeaders = headers.filter((h) => !exclude.includes(h));
  const filteredIndexes = headers
    .map((h, i) => (!exclude.includes(h) ? i : -1))
    .filter((i) => i !== -1);

  const columnWidths = filteredHeaders.map((h) => Math.max(h.length * 10, 120));

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
        const isSelected = rowIndex === selectedRowIndex;

        const orderedData: Record<string, any> = {};
        headers.forEach((header, i) => {
          orderedData[header] = row[i];
        });

        const rowContent = (
          <View
            style={[
              styles.dataRow,
              isSelected && setActive ? styles.selectedRow : {},
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
                  : false;

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
                      style={[getCellStyle(header), { width: columnWidths[i] }]}
                      maxFontSizeMultiplier={1.2}
                    >
                      {String(value)}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );

        if (setActive) {
          const filteredData: Record<string, any> = {};
          filteredHeaders.forEach((header, i) => {
            const idx = headers.indexOf(header);
            filteredData[header] = row[idx];
          });

          return (
            <TouchableOpacity
              key={`row-${rowIndex}`}
              onPress={() => {
                setSelectedRowIndex(rowIndex);
                setActive(filteredData);
              }}
            >
              {rowContent}
            </TouchableOpacity>
          );
        }
        return <View key={`row-${rowIndex}`}>{rowContent}</View>;
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
        <Text style={styles.heading} maxFontSizeMultiplier={1.2}>
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
    padding: 2,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: isMobile ? 16 : 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tableContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#3788E5",
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
    padding: 10,
    fontSize: isMobile ? 14 : 16,
    textAlign: "center",
  },
  highlightCell: {
    color: "blue",
    fontWeight: "bold",
  },
  noDataCell: {
    width: "100%",
    textAlign: "center",
  },
  cellContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1.5,
    borderRightColor: "#ddd",
  },
  scrollableBody: {
    maxHeight: 250,
  },
});

export default SimpleTable;
