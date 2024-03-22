import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import AllCardsTable from './Components/allCards'
import OneCardsTable from './Components/singleCard'

function App() {
  return (
    <div className="flex flex-col items-center gap-5 bg-pokemon1 min-h-screen">
      <BrowserRouter>
        <div className="flex place-content-start gap-20 mt-5 text-white">
          <Link to='/' className='bg-black p-5 rounded-lg'>AllCards</Link>
          <Link to='/single' className='bg-black p-5 rounded-lg'>SingleCard</Link>
        </div>


        <Routes>
          <Route path='/' element={<AllCardsTable />} />
          <Route path='/single' element={<OneCardsTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
