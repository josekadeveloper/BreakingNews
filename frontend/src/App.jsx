import { Route, Routes } from 'react-router-dom';
import DescriptionNew from './DescriptionNew';
import SportNews from './SportNews';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SportNews />} />
      <Route path="/description/:descriptionId" element={<DescriptionNew />} />
    </Routes>
  )
}

export default App
