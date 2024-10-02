import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-800">
            <Link
                to="/"
                className="container flex items-center justify-center px-6 py-5 mx-auto md:py-10"
            >
                <img className="w-32" src="/gears.svg" alt="logo" />
            </Link>
        </footer>
    )
}
