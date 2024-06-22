import { AuthReducer, AuthState } from "./AuthReducer";
import { createContext, useEffect, useReducer, useState } from "react";
import { LOGIN_EMAIL } from "../../server/sources";
import soundApi from "../../server/server";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
    loginEmail: (email: string, password: string) => void;
    handledOnSetTypeModal: (type: string) => void;
    showModal: () => void;
    status: 'checking' | 'autheticated' | 'not-autheticated';
    user: {
        IdUsuario: number;
        Nombre: string;
        Edad: string;
        Correo: string;
        Sexo: string;
    };
    img: string | null;
    isModalVisible: boolean;
    typeModal: string;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMesage: '',
    img: '',
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, authInitialState);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeModal, setTypeModal] = useState('');

    const loginEmail = async (correo: string, password: string) => {
        try {
            // const result = await soundApi.get(`${LOGIN_EMAIL}${correo}/${password}`);
            // if (result.status === 200) {
            //     console.log(result.data);
            dispatch({
                type: 'singUp',
                payload: {
                    user: { token: 'fvdfvdfvdsfv', user: 'Leonardo', img: '' },
                    token: '',
                    img: ''
                }
            });
            return true;
            // } else {
            //     return false;
            // }
        } catch (error: any) {
            console.log('Error Login', error);
            handledOnSetTypeModal('errorLogin');
            return false;
        }
    }

    const handledOnSetTypeModal = (type: string) => {
        setTypeModal(type);
        showModal();
    }

    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginEmail,
            showModal,
            handledOnSetTypeModal,
            isModalVisible,
            typeModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}
