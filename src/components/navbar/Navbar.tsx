import ThemeSelector from '../theme/ThemeSelector'

export default function Navbar() {
    return (
        <nav className="navbar flex flex-col-reverse justify-center md:flex-row md:justify-between items-center w-full bg-primary">
            <h1 className="px-2 mx-2 text-center text-base-100 font-sans-bold">
                Software Engineering Resources
            </h1>
            <div>
                <ThemeSelector />
                {/* <ThemeButton /> */}
            </div>
        </nav>
    )
}
