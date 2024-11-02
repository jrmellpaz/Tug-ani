export default function GridSkeleton() {
    return (
        <section className="grid grid-cols-[repeat(auto-fill,_400px)] justify-center gap-8">
            <div className="flex w-96 flex-col gap-4">
                <div className="skeleton h-60 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex w-96 flex-col gap-4">
                <div className="skeleton h-60 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex w-96 flex-col gap-4">
                <div className="skeleton h-60 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </section>
    );
}