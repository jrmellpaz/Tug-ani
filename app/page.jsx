import LatestArticlesView, { SectionView } from "./components/ArticleListView";

export default function Home() {
    return (
        <>
            <main className="border-box w-full p-8 md:px-20 overflow-hidden">
                <LatestArticlesView title="Latest Stories" />
            </main>
            <section className="border-box w-full md:px-20 overflow-hidden">
                <SectionView />
            </section>
            {/* TODO:
                - Add a footer component
            */}
        </>
    );
}