import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import InjectTailwind from "./InjectTailwind.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <InjectTailwind>
      <App />
    </InjectTailwind>
  </>
);
