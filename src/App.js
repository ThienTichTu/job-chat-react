import './App.scss';
import 'antd/dist/antd.css';
import Login from "./component/Login"
import Page404 from './component/Page404';
import Main from "./component/Main"
import Register from "./component/Register"
import AppProvider from "./context"
import Chat from "./component/Chat"
import Project from "./component/Project"
import Myjob from "./component/Myjob"
import ModalWarper from "./Modal"
import Friends from "./component/Friends/Friends"
import ProjectDarboard from "./component/Project/ProjectWindow/ProjectDarboard"
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
          <Main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/myjob" element={<Myjob />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/projects/:id" element={<ProjectDarboard />} />
              <Route path="/" element={<Project />} />
              <Route path="*" element={<Page404 />} />

            </Routes>
            <ModalWarper />
          </Main>
        </AppProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
