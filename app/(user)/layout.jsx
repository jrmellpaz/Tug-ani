import Header from "@/app/components/Header/Header";
import Menu from "@/app/components/Header/Menu";
import NextTopLoader from "nextjs-toploader";

export default function AdminLayout({ children }) {
    return (
        <>
            <NextTopLoader 
                color="#5a051b"
                showSpinner={false}
            />
            <Header>
                <Menu />
            </Header>
            {children}
        </>
    );
}