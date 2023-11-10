import { useState } from "react";
import { getSoapMetodos, hacerCalculoSoap} from "../api/soap_calculator";
import { useAuth } from ".";

export function useSoap() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [soap, setSoap] = useState(null);
    const [resultado, setResultado] = useState(0);
    const { auth } = useAuth();

    const getSoap_Metodos = async () => {
        try {
            setLoading(true)
            const response = await getSoapMetodos();
            setLoading(false)
            setSoap(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const Soap_Respuesta = async (data) => {
        try {
            setLoading(true)
            const response= await hacerCalculoSoap(data, auth.token);
            setLoading(false)
            setResultado(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        soap,
        resultado,
        getSoap_Metodos,
        Soap_Respuesta
    };
}
