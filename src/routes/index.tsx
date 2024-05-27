import {
  BrowserRouter,
  Route,
  Routes as RoutesContainer,
} from "react-router-dom";
import {
  Login,
  Home
} from '../pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesContainer>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </RoutesContainer>
    </BrowserRouter>
  );
}
