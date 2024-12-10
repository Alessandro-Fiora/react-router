import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import DefaultLayout from "./layouts/DefaultLayout";

// pages
import HomePage from "./pages/HomePage";
import OurTeamPage from "./pages/OurTeamPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostIndex from "./pages/PostIndex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={OurTeamPage} />
          <Route path="/posts" Component={PostIndex} />
          <Route path="*" Component={NotFoundPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
