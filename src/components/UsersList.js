import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = (props) => {
    const getUserBlogsNumber = (user) => {
        return user.blogs.length
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
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
            </table>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.allUsers
    }
}

export default connect(mapStateToProps)(UsersList)