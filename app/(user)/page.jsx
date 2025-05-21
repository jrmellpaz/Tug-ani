import LatestArticlesView, { SectionView } from "../components/ArticleListView";

export const metadata = {
    title: "Home",
}

export default function Home() {
    return (
        <>
            <main className="border-box w-full md:px-20 overflow-hidden">
                <LatestArticlesView title="Latest Stories" />
            </main>
            <section className="border-box w-full md:px-20 overflow-hidden">
                <SectionView />
            </section>
        </>
    );
}