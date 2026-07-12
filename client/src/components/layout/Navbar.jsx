import useAuth from "@/hooks/useAuth"

export default function Navbar() {
    const {logOut} = useAuth()
  return (
    <nav>
        <h2>Multi-Store-Stocks</h2>
        <button onClick={logOut}>
            Logout
        </button>
    </nav>
  )
}
