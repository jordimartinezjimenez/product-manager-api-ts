import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="bg-slate-800">
            {/* <div className="mx-5 xl:mx-auto max-w-6xl py-10"> */}
            <div className="flex items-center justify-between mx-5 xl:mx-auto max-w-6xl py-10">
                <Link to="/">
                    <h1 className="text-4xl font-extrabold text-white">Product Manager</h1>
                </Link>
                <Link to="/">
                    <img className="w-32" src="/gears.svg" alt="gears icon" />
                </Link>
            </div>
        </header>
    )
}
