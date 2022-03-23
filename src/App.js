import './App.scss';
import 'antd/dist/antd.css';
import Login from "./component/Login"
import Page404 from './component/Page404';
import Main from "./component/Main"
import Signin from "./component/Signin"
import AppProvider from "./context"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/" element={<Main />} />

            <Route path="*" element={<Page404 />} />

          </Routes>
        </AppProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
