import AboutFormContextProvider from "./AboutContext";
import AdminHeader from "@/app/components/Admin/AdminHeader";

export default function Layout({ children }) {
    return (
        <AboutFormContextProvider>
            <AdminHeader href="/admin/dashboard" />
            {children}
        </AboutFormContextProvider>
    );
}