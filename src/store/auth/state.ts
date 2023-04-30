import { AuthState } from "../../interfaces/journal";


export default (): AuthState => ({
    status: 'authenticating',
    user: null,
    idToken: null,
    refreshToken: null,
})