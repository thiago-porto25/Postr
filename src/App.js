import UserContext from './context/userContext'
import { useAuthListener } from './hooks'

function App() {
  const { authUser } = useAuthListener()
  return <UserContext.Provider value={{ authUser }}>hi</UserContext.Provider>
}

export default App
