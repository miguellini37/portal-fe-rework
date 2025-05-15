import { Homepage } from "./Homepage";
import {
  Route, BrowserRouter, Routes
} from 'react-router-dom';
import './styles.css'
import { Dashboard } from "./Dashboard";
import { Alumni } from "./Alumni";
import { Jobs } from "./Jobs";
import { Internships } from "./Internships";
import { NIL } from "./NilDeals";
import { Analytics } from "./Analytics";
import { CareerDevelopment } from "./CareerDevelopment";
import { Messages } from "./Messages";
import { SidebarLayout } from "./SidebarLayout";

const App = () => {
  const routes = [
    { path: '/', element: <Homepage />, withSidebar: true },
    { path: '/home', element: <Homepage />, withSidebar: true },
    { path: '/dashboard', element: <Dashboard />, withSidebar: true },
    { path: '/alumni', element: <Alumni />, withSidebar: true },
    { path: '/jobs', element: <Jobs />, withSidebar: true },
    { path: '/internships', element: <Internships />, withSidebar: true },
    { path: '/nil', element: <NIL />, withSidebar: true },
    { path: '/analytics', element: <Analytics />, withSidebar: true },
    { path: '/careerDevelopment', element: <CareerDevelopment />, withSidebar: true },
    { path: '/messages', element: <Messages />, withSidebar: true },
  ];

  return (
    <div style={{height:'100vh'}}>
    {/* <AuthProvider authType = {'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            refresh={refreshApi}> */}
        <BrowserRouter>
            <Routes>
            {routes.map(({ path, element, withSidebar }) => (
            <Route
              key={path}
              path={path}
              element={withSidebar ? <SidebarLayout>{element}</SidebarLayout> : element}
            />
          ))}
            </Routes>
        </BrowserRouter>
    {/* </AuthProvider> */}
</div>
  );
}

export default App;
