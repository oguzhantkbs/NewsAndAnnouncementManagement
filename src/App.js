import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { News } from './container/News';
import NewsAdmin from './components/News/NewsAdmin/NewsAdmin';
import NewsUser from './components/News/NewsUser/NewsUser';
import AnnouncementsAdmin from './components/Announcements/AnnouncementsAdmin/AnnouncementsAdmin';
import AnnouncementUser from './components/Announcements/AnnouncementUser/AnnouncementUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<NewsUser />} />
          <Route path='/NewsAdmin' element={<NewsAdmin />} />
          <Route path='/NewsUser' element={<NewsUser />} />
          <Route path='/AnnouncementsUser' element={< AnnouncementUser />} />
          <Route path='/AnnouncementsAdmin' element={<AnnouncementsAdmin />} />




        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
