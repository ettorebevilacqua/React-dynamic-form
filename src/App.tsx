import "./styles.css";
import * as parser from "./lib/parseJson";

import DinamicExample from "./comp/dinamic.example";
import FormExample from "./lib/form.example";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <FormExample />
    </div>
  );
}
