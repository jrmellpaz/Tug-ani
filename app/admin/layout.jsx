import AdminHeader from "../components/Admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="box-border overflow-x-hidden">
                <AdminHeader />
                {children}
            </div>
        </>
    );
}