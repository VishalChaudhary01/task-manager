import { Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/home";
import { SigninPage } from "./pages/signin";
import { SignupPage } from "./pages/signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/signin" element={ <SigninPage /> } />
      <Route path="/signup" element={ <SignupPage /> } />
    </Routes>
  )
}