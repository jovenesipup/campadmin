import { createContext } from "react";

const UserContext = createContext ({
    user: null,
    role: null
})

export default UserContext