import { LoadingOutlined } from "@ant-design/icons"
import { Suspense } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import RootLayout from "../layouts/RootLayout"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ApplicationsPage from "../pages/dashboard/ApplicationsPage"
import MainPage from "../pages/dashboard/MainPage"
import NotificationsPage from "../pages/dashboard/NotificationsPage"
import PersonalInfoPage from "../pages/dashboard/PersonalInfoPage"
import HomePage from "../pages/landing/HomePage"
import { buildRoutes, IRoute } from "../utils/routeUtils"
import NotFoundPage from "./NotFoundPage"

const publicRoutes: IRoute[] = [
    {
        path: '',
        element: <HomePage />
    },
    { path: "auth/login", element: <LoginPage /> },
    { path: "auth/register", element: <RegisterPage /> },
];

const privateRoutes: IRoute[] = [
    {
        path: "dashboard",
        children: [
            { path: 'main', element: <MainPage /> },
            { path: 'applications', element: <ApplicationsPage /> },
            { path: 'notifications', element: <NotificationsPage /> },
            { path: 'personal-info', element: <PersonalInfoPage /> },
        ]
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