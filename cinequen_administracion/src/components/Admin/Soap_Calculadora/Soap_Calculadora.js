import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Form, Input } from "semantic-ui-react"
import { map } from "lodash"
import {useSoap} from "../../../hooks/useSoap_Calculadora"
import { useFormik } from "formik";
import * as Yup from "yup";

export function Soap_Calculadora() {
    const {loading, soap, resultado, Soap_Respuesta, getSoap_Metodos} = useSoap()
    const [soapMetodos, setSoapMetodos] = useState([]);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

    useEffect(() => {
        getSoap_Metodos()
    }, [])

    useEffect(() => {
        if (!loading) {
            setSoapMetodos(formatDropdownData(soap.response));
            setIsDropdownDisabled(false);
        }
    }, [loading, soap]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await Soap_Respuesta(formValue)
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Dropdown placeholder='Metodo'
                        fluid selection search
                        options={soapMetodos}
                        value={formik.values.metodo}
                        onChange={(_, data) => formik.setFieldValue('metodo', data.value)}
                        error={formik.errors.metodo}
                        disabled={isDropdownDisabled}
                        style={{ marginBottom: '20px' }}
                    />

                <Form.Input name="num1" value={formik.values.num1} onChange={formik.handleChange} error={formik.errors.num1} placeholder="Numero 1"></Form.Input>
                <Form.Input name="num2" value={formik.values.num2} onChange={formik.handleChange} error={formik.errors.num2} placeholder="Numero 2"></Form.Input>
                <Button type='submit' content="Calcular" color="green" fluid />
            </Form >

            <Input
                action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'fa-duotone fa-calculator',
                content: 'Resultado',
                }}
                readOnly
                value={resultado.response}
                style={{ marginTop: '30px' }}
            />
        </>
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item,
        text: item,
        value: item
    }));
}

function initialValues() {
    return {
        metodo: "",
        num1: "",
        num2: "",
    }
}

function newSchema() {
    return {
        metodo: Yup.string().required(true),
        num1: Yup.string().required(true),
        num2: Yup.string().required(true),
    }
}