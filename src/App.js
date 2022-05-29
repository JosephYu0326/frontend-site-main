import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom';
//Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Category from './Pages/Categorie';
import Register from './Pages/Register';
import AddCategorie from './Pages/AddCategorie';
import AddExhibition from './Pages/AddExhibition'
import EditExhibition from './Pages/EditExhibition';

//Components
import Header from './Components/Header';


function App() {
  return (
   <Container>
     <Header />
     <Routes>
       {/* http://localhost:3000 */}
       <Route path="/" element={<Home />} />
       {/* http://localhost:3000/about */}
       <Route path="/about" element={<About />} />
       <Route path="/addExhibition" element={<AddExhibition />} />
       <Route path="/editExhibition/:exhibitionID" element={<EditExhibition />} />
       {/* http://localhost:3000/contact */}
       <Route path="/contact" element={<Contact />} />
       {/* http://localhost:3000/categories */}
       <Route path="/categories" element={<Category />} />
       <Route path="/addcategories" element={<AddCategorie />} />
       {/* http://localhost:3000/register */}
       <Route path="/register" element={<Register />} />
     </Routes>
  </Container>
  );
}

export default App;
