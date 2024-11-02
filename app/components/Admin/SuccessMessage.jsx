export default function SuccessMessage({ header, message="" }) {
    return (
        <div className="m-4 mt-6 mb-10 flex gap-4 bg-green-100 flex-row p-4 rounded-xl w-full place-self-center items-center">
            <img src="/success.svg" alt="Success" />
            <p className="text-green-800 text-sm font-openSansRegular">
                <b className="text-base">{header}</b> <br />
                {message}
            </p>
        </div>
    );
}