export default function ErrorMessage({ header, message="" }) {
    return (
        <div className="m-4 mt-6 flex gap-4 bg-red-200 flex-row p-4 rounded-xl w-full place-self-center items-center">
            <img src="/error.svg" alt="Error" />
            <p className="text-red-500 text-sm font-openSansRegular">
                <b className="text-base">{header}</b> <br />
                {message}
            </p>
        </div>
    );
}