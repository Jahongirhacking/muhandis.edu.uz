import { LoadingOutlined } from "@ant-design/icons"
import { Suspense } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TestComponent from "../components/TestComponent"
import AdminLayout from "../layouts/AdminLayout"
import DashboardLayout from "../layouts/DashboardLayout"
import RootLayout from "../layouts/RootLayout"
import AdminApplicationDetails from "../pages/admin/AdminApplicationDetails"
import AdminApplications from "../pages/admin/AdminApplications"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ApplicationsPage from "../pages/dashboard/applications"
import CreateApplicationsPage from "../pages/dashboard/applications/CreateApplicationsPage"
import ViewApplicationsPage from "../pages/dashboard/applications/ViewApplicationsPage"
import MainPage from "../pages/dashboard/MainPage"
import NotificationsPage from "../pages/dashboard/NotificationsPage"
import HomePage from "../pages/landing/HomePage"
import CallbackPage from "../pages/utils/CallbackPage"
import { Role } from "../services/types"
import { buildRoutes, IRoute } from "../utils/routeUtils"
import NotFoundPage from "./NotFoundPage"

const publicRoutes: IRoute[] = [
    {
        path: '',
        element: <HomePage />
    },
    { path: "auth/login", element: <LoginPage /> },
    { path: "auth/register", element: <RegisterPage /> },
    { path: "auth/callback", element: <CallbackPage /> },
    { path: "test/component", element: <TestComponent /> },
    // { path: "error", element: <ErrorPage /> }
];

const privateRoutes: IRoute[] = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: 'main', element: <MainPage /> },
            {
                path: 'applications',
                element: <ApplicationsPage />,
                children: [
                    { path: '', element: <ViewApplicationsPage /> },
                    { path: 'create', element: <CreateApplicationsPage /> },
                    { path: 'edit', element: <CreateApplicationsPage editable={true} /> }
                ]
            },
            { path: 'notifications', element: <NotificationsPage /> },
        ]
    },
    {
        path: "expert",
        element: <AdminLayout role={Role.Expert} />,
        children: [
            { path: 'applications', element: <AdminApplications /> },
            { path: 'applications/:id', element: <AdminApplicationDetails /> }
        ]
    },
    {
        path: "ministry",
        element: <AdminLayout role={Role.Ministry} />,
        children: [
            { path: 'applications', element: <AdminApplications /> },
            { path: 'applications/:id', element: <AdminApplicationDetails /> }
        ]
    },
]

const MainRouter = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingOutlined />}>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        {buildRoutes(publicRoutes)}
                        {buildRoutes(privateRoutes, 'private')}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default MainRouter