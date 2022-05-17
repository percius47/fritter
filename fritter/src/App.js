import "./App.css";
import  {Toaster} from "react-hot-toast"
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (  
     <div className="bg-dark text-light">
<Toaster
        position="bottom-right"
        reverseOrder={false}
        containerStyle={{
          bottom: "1rem",
          right: "1rem",
          fontSize: "0.9rem",
        }}
      />
  <AppRoutes />
</div>
  );
}

export default App;
