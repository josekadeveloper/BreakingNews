import { Route, Routes } from 'react-router-dom';
import DescriptionNew from './components/DescriptionNew';
import SportNews from './components/SportNews';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SportNews />} />
      <Route path="/description/:descriptionId" element={<DescriptionNew />} />
    </Routes>
  )
}

export default App
