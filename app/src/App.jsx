import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import EmpDash from "./Components/EmpDash";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Calls from "./Components/Calls";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import AddCalls from "./Components/AddCalls";
import AddCalls2 from "./Components/AddCalls2";
import EditEmployee from "./Components/EditEmployee";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";
import Bonus from "./Components/Bonus";
import BonusObj from "./Components/BonusObj";
import Objections from "./Components/Objections";
import EditCalls from "./Components/EditCalls";
import EditCallStatus from "./Components/EditCallStatus";
import Response from "./Components/Response";
import EmployeeBonus from "./Components/EmployeeBonus";
import SignUP from "./Components/SignUp";
import AdminAdd from "./Components/AdminAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route path="/employee_detail/:id" element={<EmployeeDetail />}></Route>
        <Route path="/signup" element={<SignUP />}></Route>
        <Route path="/adminadd" element={<AdminAdd />}></Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/empbonus" element={<EmployeeBonus />}></Route>
          <Route path="/dashboard/response" element={<Response />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>

        <Route
          path="/empdash"
          element={
            <PrivateRoute>
              <EmpDash />
            </PrivateRoute>
          }
        >
          <Route path="/empdash/calls" element={<Calls />}></Route>
          <Route path="/empdash/add_calls" element={<AddCalls />}></Route>
          <Route path="/empdash/add_calls2" element={<AddCalls2 />}></Route>
          <Route
            path="/empdash/edit_calls/:callstatusid"
            element={<EditCalls />}
          ></Route>
          <Route path="/empdash/bonus" element={<Bonus />}></Route>
          <Route path="/empdash/bonusobj" element={<BonusObj />}></Route>
          <Route path="/empdash/objections" element={<Objections />}></Route>
          <Route
            path="/empdash/edit_call_status"
            element={<EditCallStatus />}
          ></Route>
          <Route
            path="/empdash/edit_call_status/:CallStatusID"
            element={<EditCallStatus />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;