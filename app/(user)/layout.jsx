import Header from "@/app/components/Header/Header";
import Menu from "@/app/components/Header/Menu";

export default function AdminLayout({ children }) {
    return (
        <>
            <Header>
                <Menu />
            </Header>
            {children}
        </>
    );
}