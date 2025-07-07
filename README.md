# React Native Simple Table

A clean, customizable table component for React Native.

![npm](https://img.shields.io/npm/v/react-native-simple-table)
![license](https://img.shields.io/npm/l/react-native-simple-table)

---

## ✨ Features

✅ Customizable headers  
✅ Row highlighting  
✅ Checkbox rendering  
✅ Scrollable table body  
✅ Row selection with callbacks

---

## 📦 Installation

```bash
npm install @karthicraja/react-native-simple-table
```

4️⃣ **Full example in a component:**

```tsx
import React from "react";
import { SimpleTable } from "@karthicraja/react-native-simple-table";

export default function MyScreen() {
  return (
    <SimpleTable
      heading="Employee Directory"
      headers={["Name", "Active", "Joining Date"]}
      tableData={[
        ["Alice", "Y", "2021-04-01"],
        ["Bob", "N", "2020-08-15"],
        ["Carol", "Y", "2022-06-10"],
      ]}
      highlightVal={["Active"]}
      checkboxHeaders={["Active"]}
      setActive={(row) => console.log("Row selected:", row)}
    />
  );
}
```

## 🎨 Custom Styling

```bash
<SimpleTable
  headers={["Product", "In Stock"]}
  tableData={[
    ["Widget A", "Y"],
    ["Widget B", "N"],
  ]}
  customStyles={{
    headerRow: { backgroundColor: "#4CAF50" },
    headerCell: { color: "#fff", fontSize: 16 },
    dataRow: { backgroundColor: "#f0f0f0" },
    selectedRow: { backgroundColor: "#D1E7DD" },
    dataCell: { color: "#333" },
    highlightCell: { color: "red", fontWeight: "bold" },
  }}
/>
```
