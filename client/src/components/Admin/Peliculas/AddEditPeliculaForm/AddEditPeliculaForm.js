import React, { useCallback, useState } from 'react'
import { Form, Button, TextArea, Image, Dropdown } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone"
import { usePelicula } from "../../../../hooks"
import "./AddEditPeliculaForm.scss";

export function AddEditPeliculaForm(props) {

    const { onClose, onRefetch, pelicula } = props;
    const { addPelicula, updatePelicula } = usePelicula();
    const [previewImage, setPreviewImage] = useState(pelicula?.poster || null)

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('poster', file)
        setPreviewImage(URL.createObjectURL(file));
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop // La funcion se llama igual a la propiedad, por eso solo se pone onDrop y no onDrop: onDrop()
    });

    const clasificationOptions = [
        { key: '1', value: 'ATP', text: 'ATP' },
        { key: '2', value: 'PG-13', text: 'PG-13' },
        { key: '3', value: 'PG-16', text: 'PG-16' },
        { key: '4', value: 'PG-18', text: 'PG-18' },
    ];

    const formik = useFormik({
        initialValues: initialValues(pelicula),
        validationSchema: Yup.object(pelicula ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (pelicula) await updatePelicula(pelicula.id, formValue);
                else await addPelicula(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    });

    return (
        <Form className='add-edit-pelicula-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} error={formik.errors.nombre} placeholder="Nombre de la pelicula"></Form.Input>
            <Form.Input name="duracion" value={formik.values.duracion} onChange={formik.handleChange} error={formik.errors.duracion} placeholder="Duracion"></Form.Input>
            <Form.Input name="genero" value={formik.values.genero} onChange={formik.handleChange} error={formik.errors.genero} placeholder="Género"></Form.Input>

            <Dropdown placeholder='Clasificación'
                fluid selection search
                options={clasificationOptions}
                value={formik.values.clasificacion}
                onChange={(_, data) => formik.setFieldValue('clasificacion', data.value)}
                error={formik.errors.clasificacion}
            />

            <TextArea rows={3} placeholder='Descripción' name='descripcion' value={formik.values.descripcion} onChange={formik.handleChange} error={formik.errors.descripcion} />

            <Button type='button' fluid {...getRootProps()} color={formik.errors.poster && "red"}>
                {previewImage ? "Editar Póster" : "Subir Póster"}
            </Button>

            <input {...getInputProps()} />

            <Image src={previewImage} />

            <Button type='submit' content={pelicula ? "Actualizar" : "Registrar"} color={pelicula ? "yellow" : "green"} fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        nombre: data?.nombre || "",
        duracion: data?.duracion || "",
        genero: data?.genero || "",
        clasificacion: data?.clasificacion || "",
        descripcion: data?.descripcion || "",
        poster: "",
    }
}

function newSchema() {
    return {
        nombre: Yup.string().required(true),
        duracion: Yup.string().matches(/^\d+$/, "La duración debe ser un número entero.").required(true),
        genero: Yup.string().required(true),
        clasificacion: Yup.string().required(true),
        descripcion: Yup.string(),
        poster: Yup.string().required(true),
    }
}

function updateSchema() {
    return {
        nombre: Yup.string().required(true),
        duracion: Yup.string().matches(/^\d+$/, "La duración debe ser un número entero.").required(true),
        genero: Yup.string(),
        clasificacion: Yup.string().required(true),
        descripcion: Yup.string(),
        poster: Yup.string(),
    }
}