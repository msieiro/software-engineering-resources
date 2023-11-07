import { useThemeSelector } from '../../hooks/useThemeSelector'

export default function ThemeSelector() {
    const { theme, setTheme } = useThemeSelector()
    const handleChangeTheme = (val: string) => setTheme(val)

    const themes = [
        'light',
        'dark',
        'cupcake',
        'bumblebee',
        'emerald',
        'corporate',
        'synthwave',
        'retro',
        'cyberpunk',
        'valentine',
        'halloween',
        'garden',
        'forest',
        'aqua',
        'lofi',
        'pastel',
        'fantasy',
        'wireframe',
        'black',
        'luxury',
        'dracula',
        'cmyk',
        'autumn',
        'business',
        'acid',
        'lemonade',
        'night',
        'coffee',
        'winter'
    ]

    return (
        <select
            className="select select-bordered w-full max-w-xs mx-1 my-1 bg-base-100 text-base-content font-sans-bold rounded-md"
            onChange={(e) => handleChangeTheme(e.target.value)}
            value={theme}
        >
            <option
                disabled
                className="bg-base-100 text-base-content font-sans-bold"
                value=""
            >
                Theme
            </option>
            {themes.map((theme) => (
                <option
                    key={theme}
                    value={theme}
                    className="bg-base-100 text-base-content font-sans-bold"
                >
                    {theme}
                </option>
            ))}
        </select>
    )
}
