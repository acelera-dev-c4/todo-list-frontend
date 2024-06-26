import {
  Route,
  Routes as RoutesContainer,
} from "react-router-dom";
import {
  Login,
  Home,
  PrivateRoute,
  NotFound
} from '../pages';

export default function Routes() {
  return (
    <RoutesContainer>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PrivateRoute />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </RoutesContainer>
  );
}
