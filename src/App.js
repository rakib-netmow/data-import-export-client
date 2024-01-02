import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("file", file);
    console.log("submited", newData.get("file"));
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
