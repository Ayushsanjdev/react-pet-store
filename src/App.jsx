import { useState } from "react";
import "./App.css";
import Header from "./components/AppHead/Header";
import TableComponent from "./components/Tables/TableComponent";
import { formDefaultValues } from "./components/Constants/Constants";

const App = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(formDefaultValues);

  return (
    <div className="App">
      <Header />
      <TableComponent
        open={open}
        setOpen={setOpen}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </div>
  );
};

export default App;
