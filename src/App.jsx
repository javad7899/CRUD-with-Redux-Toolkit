import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./UserPost/Home";
import CreatePost from "./UserPost/CreatePost";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
