import "./../globals.css"

export const metadata = {
  title: "Admin — GLF Auto",
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {children}
    </div>
  )
}