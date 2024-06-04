export interface AuthState {
    errorMesage: string;
    img: string | null;
    status: 'checking' | 'autheticated' | 'not-autheticated';
    token: string | any;
    user: any;
}

type AuthAction =
    | { type: 'addError', payload: string }
    | { type: 'checkToken', payload: { token: string, user: any, img: string | null } }
    | { type: 'logOut' }
    | { type: 'no-authenticated' }
    | { type: 'removeError' }
    | { type: 'singUp', payload: { token: string, user: any, img: any | null } }
    | { type: 'updateImage', payload: { img: string } }

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'autheticated',
                token: null,
                errorMesage: action.payload,
            }
        case 'removeError':
            return {
                ...state,
                errorMesage: '',
            }
        case 'singUp':
            return {
                ...state,
                errorMesage: '',
                status: 'autheticated',
                token: action.payload.token,
                user: action.payload.user,
                img: action.payload.img
            }
        case 'checkToken':
            return {
                ...state,
                errorMesage: '',
                status: 'autheticated',
                token: action.payload.token,
                user: action.payload.user,
                img: action.payload.img

            }
        case 'logOut':
        case 'no-authenticated':
            return {
                ...state,
                status: 'not-autheticated',
                token: null,
                user: null,
            }
        case 'updateImage':
            return {
                ...state,
                status: 'checking',
                errorMesage: '',
                img: action.payload.img
            }
        default:
            return state;
    }
}
