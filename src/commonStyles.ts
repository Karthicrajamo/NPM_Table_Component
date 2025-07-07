import { Dimensions, StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  heading: { padding: 8, fontWeight: "600", color: "black", fontSize: 14 },
  textCenter: { alignItems: "center", justifyContent: "center" },
  rightAlign: { alignSelf: "flex-end", marginRight: 5 },
  rightAlignNoMargin: { alignSelf: "flex-end" },
  flexRowContainer: { flexDirection: "row" },
  flexColumnContainer: { flexDirection: "column" },
  padTop: { paddingTop: 10 },
  flexRowCenterWithPad: {
    flexDirection: "row",
    padding: 3,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  flexRowNoPadd: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexColumn: {
    flexDirection: "column",
    padding: 10,
  },
  oneLineKey: {
    color: "#8B8B8B",
    // fontWeight: '600',
    flex: 1, // Ensure the key takes up available space
  },
  oneLineValue: {
    color: "black",
    // marginLeft: 10, // Adjust for spacing from the key
    flex: 2, // Ensures the value input takes up more space
  },
  boxForValue: {
    backgroundColor: "#E8E8E8",
    padding: 5,
    paddingRight: 200,
    borderRadius: 5,
  },
  // Button Styles
  disableButtonTextContainer: {
    backgroundColor: "#a5c9f3",
    width: 150,
    padding: 20,
    marginLeft: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  disableButtonTextContainerNxtSize: {
    backgroundColor: "#a5c9f3",
    padding: 20,
    marginLeft: 10,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    maxWidth: 300,
  },
  disableButtonText: {
    color: "#f2f2f2",
  },
  enableButtonTextContainer: {
    backgroundColor: "#3788E5",
    width: "auto",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // marginRight: '15%',
  },

  input: {
    // height: 40, // Increased height for better visibility
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 14,
    color: "black", // Gray text color for disabled state
    padding: 0,
    borderWidth: 1, // Border for input
    borderColor: "#ddd", // Light border color for clarity
    marginTop: 0,
  },
  inputNoBox: {
    height: 40,
    paddingLeft: 10,
    fontSize: 12,
    color: "#888", // Gray text color for disabled state
    padding: 0,
    borderBottomWidth: 1, // Border for input
    borderColor: "#ddd", // Light border color for clarity
    marginTop: 5,
    width: 100,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
  },
  label: {
    marginRight: 10,
    fontSize: 12,
    color: "black",
  },
  redAsterisk: {
    color: "red", // Set the asterisk color to red
  },

  oneLineValueTextArea: {
    color: "black",
    flex: 2, // Ensures the value input takes up more space
  },
  inputTextArea: {
    height: 120, // Height for multi-line input
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    color: "#888", // Gray text color for disabled state
    padding: 0,
    borderWidth: 1, // Border for input
    borderColor: "#ddd", // Light border color for clarity
    marginTop: 0,
  },

  textArea: {
    textAlignVertical: "top", // Aligns text to the top for better readability
  },

  // PDF Model Styles
});

export default commonStyles;
