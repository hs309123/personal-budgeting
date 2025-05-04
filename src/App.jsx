

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/publicPages/home/Home";
import Signup from "./pages/publicPages/signup/Signup";
import Login from "./pages/publicPages/login/Login";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/protectedPages/dashboard/Dashboard";
import ProtectRoute from "./components/ProtectedRoute";
import Income from "./pages/protectedPages/income/Income";
import Expense from "./pages/protectedPages/expense/Expense";
import Savings from "./pages/protectedPages/savings/Savings";
import Budget from "./pages/protectedPages/budget/Budget";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="" element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/budget" element={<Budget />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
