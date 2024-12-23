export default function WarnMessage({ header, message="" }) {
    return (
        <div className="m-4 mt-6 mb-10 flex gap-4 bg-yellow-200 flex-row p-4 rounded-xl w-full place-self-center items-center">
            <img src="/warn.svg" alt="Error" />
            <p className="text-yellow-700 text-sm font-openSansRegular">
                <b className="text-base">{header}</b> <br />
                {message}
            </p>
        </div>
    );
}