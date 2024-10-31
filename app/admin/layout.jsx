import AdminHeader from "../components/Admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="box-border overflow-x-hidden bg-tugAni-white">
                <AdminHeader />
                {children}
            </div>
        </>
    );
}