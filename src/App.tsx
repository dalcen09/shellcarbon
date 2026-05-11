import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Page1Overview from './pages/Page1Overview';
import Page2Operations from './pages/Page2Operations';
import Page3Scope from './pages/Page3Scope';
import Page4ESG from './pages/Page4ESG';
import Page5Market from './pages/Page5Market';
import Page6Engine from './pages/Page6Engine';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Page1Overview />} />
          <Route path="/operations" element={<Page2Operations />} />
          <Route path="/scope" element={<Page3Scope />} />
          <Route path="/esg" element={<Page4ESG />} />
          <Route path="/market" element={<Page5Market />} />
          <Route path="/engine" element={<Page6Engine />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
