import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Layout() {
    return (
        <>
            <Header />
            <main className="my-10 mx-5 xl:mx-auto max-w-6xl p-10 bg-white shadow-lg rounded-lg">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
