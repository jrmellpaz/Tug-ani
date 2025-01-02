import { getAbout } from "@/lib/firebase/about/read_server"

export const metadata = {
    title: "About us",
}

export default async function Page() {
    const { bannerURL, boardTitle, boardTitleText, intro, introText, profiles }  = await getAbout();
    return (
        <main className="flex flex-col items-center w-full gap-8 box-border pb-32">
            <Banner bannerURL={bannerURL} />
            <section className="mx-8 sm:mx-24 md:mx-40">
                <Intro heading={intro} body={introText} />
            </section>
            <section className="mx-8 sm:mx-24 md:mx-40 flex flex-col gap-8 pb-12">
                <Intro heading={boardTitle} body={boardTitleText} />
                <ProfileGallery profiles={profiles} />
            </section>
        </main>
    )
}

function Banner({ bannerURL }) {
    return (
        <img 
            src={bannerURL} 
            alt="About Us Banner" 
            className="max-w-[1200px] w-full h-auto object-cover md:rounded-box"
        />
    )
}

function Intro({ heading, body }) {
    const formattedBody = body.replace(/\\n/g, '<br /><br />');

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <h1 className="text-4xl md:text-6xl font-gotham text-tugAni-red tracking-tighter text-center">
                {heading}
            </h1>
            <p 
                className="font-openSansRegular text-tugAni-black"
                dangerouslySetInnerHTML={{ __html: formattedBody }}
            />
        </div>
    );
}

function ProfileGallery({ profiles }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, key) => (
                <ProfileCard key={key} profile={profile} />
            ))}
        </div>
    ) 
}

function ProfileCard({ profile }) {
    return (
        <div className="flex flex-col p-8 bg-white shadow rounded-box">
            <img 
                src={profile.imageURL} 
                alt={profile.name} 
                className="aspect-square max-w-60 w-full h-auto object-cover rounded-full mb-4 self-center"
            />
            <h2 className="text-2xl tracking-tight font-gotham text-tugAni-red text-center">{profile.name}</h2>
            <h3 className="font-openSansBold text-tugAni-black text-sm text-center">{profile.role}</h3>
            <p className="font-openSansRegular text-tugAni-black text-sm mt-2">{profile.description}</p>
        </div>
    );
}