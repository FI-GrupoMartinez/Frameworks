import React from 'react'
import "./TableUsers.scss"
import { Table, Button, Icon } from "semantic-ui-react"
import { map } from "lodash"


export function TableUsers(props) {
    const { users, updateUser, deleteUser } = props;
    return (
        <Table className='table-users-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre de Usuario</Table.HeaderCell>
                    <Table.HeaderCell>Correo</Table.HeaderCell>
                    <Table.HeaderCell>Nombres</Table.HeaderCell>
                    <Table.HeaderCell>Apellidos</Table.HeaderCell>
                    <Table.HeaderCell>Activo</Table.HeaderCell>
                    <Table.HeaderCell>Staff</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(users, (user, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.first_name}</Table.Cell>
                        <Table.Cell>{user.last_name}</Table.Cell>
                        <Table.Cell className='status'>
                            {user.is_active ? <Icon name='check' /> : <Icon name='close' />}
                        </Table.Cell>
                        <Table.Cell className='status'>
                            {user.is_staff ? <Icon name='check' /> : <Icon name='close' />}
                        </Table.Cell>
                        <Actions user={user} updateUser={updateUser} deleteUser={deleteUser} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { user, updateUser, deleteUser } = props;

    return (
        <Table.Cell textAlign='right'>
            <Button icon color='yellow' onClick={() => updateUser(user)}>
                <Icon name='pencil' />
            </Button>
            <Button icon negative onClick={() => deleteUser(user)}>
                <Icon name='trash alternate' />
            </Button>
        </Table.Cell>
    )
}