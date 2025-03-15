import { LoadingOutlined } from "@ant-design/icons"
import { Suspense } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import RootLayout from "../layouts/RootLayout"
import AdminPage from "../pages/admin"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ApplicationsPage from "../pages/dashboard/applications"
import CreateApplicationsPage from "../pages/dashboard/applications/CreateApplicationsPage"
import ViewApplicationsPage from "../pages/dashboard/applications/ViewApplicationsPage"
import MainPage from "../pages/dashboard/MainPage"
import NotificationsPage from "../pages/dashboard/NotificationsPage"
import HomePage from "../pages/landing/HomePage"
import MinistryPage from "../pages/ministry"
import CallbackPage from "../pages/utils/CallbackPage"
import ErrorPage from "../pages/utils/ErrorPage"
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
    { path: "error", element: <ErrorPage /> }
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
        path: "admin",
        element: <AdminPage />
    },
    {
        path: 'ministry',
        element: <MinistryPage />
    }
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