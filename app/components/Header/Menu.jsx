export default function Menu() {
    return (
        <div className="h-16 w-full bg-white flex items-center justify-center shadow-md transition-[height]">
            <ul className="flex gap-8 cursor-pointer">
                <li>Home</li>
                <li>News</li>
                <li>Feature & Culture</li>
                <li>Views</li>
                <li>Sports</li>
            </ul>
        </div>
    );
}