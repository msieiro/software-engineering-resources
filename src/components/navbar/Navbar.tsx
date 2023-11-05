import ThemeButton from '../theme/ThemeButton'

export default function Navbar() {
    return (
        <nav className="navbar flex flex-col-reverse justify-center md:flex-row md:justify-between items-center w-full bg-primary-content">
            <h1 className="fpx-2 mx-2 text-center text-primary font-serif font-bold">
                Software Engineering Resources
            </h1>
            <div>
                <ThemeButton />
            </div>
        </nav>
    )
}
