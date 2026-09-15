import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Login } from "../auth/Login";
import { HomeRedirect } from "../auth/HomeRedirect";
import { UserManagement } from "../pages/users/components/UserManagement";
import { Services } from "../pages/services/Services";
import { Stores } from "../pages/stores/Stores";
import { Alerts } from "../pages/alerts/Alerts";
import { Notifications } from "../pages/notifications/Notifications";
import { Profile } from "../pages/profile/Profile";
import { AuthorizedRoute, UserHomeRedirect } from "../auth/AuthorizedRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<HomeRedirect />} >
          <Route path="/" element={<UserHomeRedirect />} />
          <Route path="/users" element={<AuthorizedRoute permission="VIEW_USERS"><UserManagement /></AuthorizedRoute>} />
          <Route path="/services" element={<AuthorizedRoute permission="VIEW_SERVICES" allowStandardUser><Services /></AuthorizedRoute>} />
          <Route path="/stores" element={<AuthorizedRoute permission="VIEW_STORES"><Stores /></AuthorizedRoute>} />
          <Route path="/alerts" element={<AuthorizedRoute permission="VIEW_ALERTS"><Alerts /></AuthorizedRoute>} />
          <Route path="/notifications" element={<AuthorizedRoute permission="VIEW_NOTIFICATIONS" allowStandardUser><Notifications /></AuthorizedRoute>} />
          <Route path="/profile" element={<AuthorizedRoute><Profile /></AuthorizedRoute>} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
        {/* <Routere path="/" element={<HomeRedirect />} />

        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/services" element={<Services />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/multicompany" element={<MultiCompany />} />
          <Route path="/support" element={<LiveSupport />} />
        </Route>

        <Route path="*" element={<HomeRedirect />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
