// App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import ShowData from './components/ShowData';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<ShowData/>} />
        <Route path="/add" element={<ExpenseTracker onTrue={undefined} onClose={undefined}/>} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
