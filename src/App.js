import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("file", file);
    // console.log("submited", newData.get("file"));

    const res = await axios.post("http://localhost:5000/v1/import", newData);
    console.log(res);
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
    </div>
  );
}

export default App;
