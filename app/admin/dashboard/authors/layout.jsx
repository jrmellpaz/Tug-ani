import AuthorFormContextProvider from "./form/contexts/AuthorFormContext";

export default function Layout({ children }) {
    return (
        <AuthorFormContextProvider>
            {children}
        </AuthorFormContextProvider>
    );
}