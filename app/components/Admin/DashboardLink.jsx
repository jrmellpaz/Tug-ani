import Link from "next/link";

export default function DashboardLink(props) {
    return (
        <Link {...props} className="font-openSansBold box-border h-60 border border-solid border-slate-300 rounded-xl hover:shadow-md flex justify-center items-center" />
    );
}