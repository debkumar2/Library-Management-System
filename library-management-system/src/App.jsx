import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddBook from "./Components/Books/AddBook";
import BookList from "./Components/Books/BookList";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/books',
    element: <BookList />
  },
  {
    path: '/books/add',
    element: <AddBook />
  }

])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
