import { Navigation } from "./_components/navigation"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex min-h-screen flex-col ">
            <Navigation />

            {children}
        </div>
    )
}