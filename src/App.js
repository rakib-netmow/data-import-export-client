import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [csvFields, setCsvFields] = useState([]);
  const [desireFields, setDesireFields] = useState([]);
  const [data, setData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("file", file);
    // console.log("submited", newData.get("file"));

    const res = await axios.post("http://localhost:5000/v1/import", newData);
    setCsvFields(res?.data);
    const res2 = await axios.get(
      "http://localhost:5000/v1/all-guardian-fields"
    );
    setDesireFields(res2?.data);
    console.log(res);
    console.log(res2);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <br />
        <input type="submit" value="import" />
      </form>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        {csvFields?.length > 0 &&
          csvFields?.map((f, i) => (
            <div key={i}>
              <label>{f}</label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const newObject = Object.fromEntries([[value, csvFields[i]]]);
                  console.log(newObject);
                  const newField = {
                    ...data,
                    ...newObject,
                  };
                  setData(newField);
                  console.log(data);
                }}
              >
                {desireFields?.length > 0 &&
                  desireFields?.map((d, i) => <option key={i}>{d}</option>)}
              </select>
            </div>
          ))}
      </form>
    </div>
  );
}

export default App;
