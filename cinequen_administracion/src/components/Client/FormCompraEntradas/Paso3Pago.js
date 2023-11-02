import React from 'react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { MERCADO_PAGO_API_KEY } from "../../../utils/constants"

initMercadoPago(MERCADO_PAGO_API_KEY, { locale: 'es-AR' });

export function Paso3Pago(props) {
    const { precioEntradas } = props;
    const initialization = {
        amount: precioEntradas,
        installments: 1, // Establecer una sola cuota
    };
    const customization = {
        paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // callback llamado al hacer clic en el botón enviar datos
        console.log(formData);
    };
    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
    };

    return (
        <>
            <h2>Monto a pagar: ${precioEntradas}</h2>
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
        </>
    )
}
