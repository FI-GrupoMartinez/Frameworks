import React from 'react'
import { Menu, Icon } from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../hooks"
import "./SideBar.scss"

export function SideBar(props) {
    const { children } = props
    const { pathname } = useLocation();
    return (
        <div className='side-menu-admin'>
            <MenuLeft pathname={pathname} />
            <div className='content'>{children}</div>
        </div>
    )
}


function MenuLeft(props) {
    const { pathname } = props
    const { auth } = useAuth();

    return (
        <Menu fixed="left" borderless className='side' vertical>
            <Menu.Item as={Link} to={'/admin'} active={pathname === '/admin'}>
                <Icon name='home' /> Escritorio
            </Menu.Item>

            <Menu.Item as={Link} to={'/admin/peliculas'} active={pathname === '/admin/peliculas'}>
                <Icon name='film' /> Peliculas
            </Menu.Item>
            {auth.me?.is_staff && (
                <Menu.Item as={Link} to={'/admin/users'} active={pathname === '/admin/users'}>
                    <Icon name='users' /> Usuarios
                </Menu.Item>
            )}
        </Menu>

    )
}
