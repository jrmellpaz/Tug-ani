import AdminHeader from "../components/Admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <>
            <div>
                <AdminHeader />
                {children}
            </div>
        </>
    );
}