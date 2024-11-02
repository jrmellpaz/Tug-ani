import CategoryFormContextProvider from "./form/contexts/CategoryFormContext";

export default function Layout({ children }) {
    return (
        <CategoryFormContextProvider>
            {children}
        </CategoryFormContextProvider>
    );
}