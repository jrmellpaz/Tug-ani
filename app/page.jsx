import Header from "./components/Header/Header";
import LatestArticlesView, { SectionView } from "./components/ArticleListView";

export default function Home() {
    return (
        <>
            <nav className="box-border sticky top-0 w-full px-4 shadow-md">
                <Header />
            </nav>
            <main className="border-box w-full p-8 md:px-20 overflow-hidden">
                <LatestArticlesView title="Latest Stories" />
                <SectionView />
            </main>
            {/* TODO:
                - Add a footer component
            */}
        </>
    );
}