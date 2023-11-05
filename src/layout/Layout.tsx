import Navbar from '../components/navbar/Navbar'
import ResourceList from '../components/resource-card/ResourceList'

export default function Layout() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <ResourceList />
        </div>
    )
}
