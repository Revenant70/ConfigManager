import Sidebar from "./Sidebar"

export default function Profile() {
    return (
        <>
            <div className="flex flex-row">
                <Sidebar />
                <div>Hello Profile</div>
            </div>
        </>
    )
}