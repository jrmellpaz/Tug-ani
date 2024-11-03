import ArticleFormContextProvider from "./form/contexts/ArticleFormContext";

export default function Layout({ children }) {
    return (
        <ArticleFormContextProvider>
            {children}
        </ArticleFormContextProvider>
    );
}