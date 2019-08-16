import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const UsersList = (props) => {
    const getUserBlogsNumber = (user) => {
        return user.blogs.length
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>
                                {getUserBlogsNumber(user)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.allUsers
    }
}

export default connect(mapStateToProps)(UsersList)