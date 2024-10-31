import AdminHeader from "../components/Admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="box-border overflow-x-hidden bg-tugAni-white mt-20">
                <AdminHeader />
                {children}
            </div>
        </>
    );
}