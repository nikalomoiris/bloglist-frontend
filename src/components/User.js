import React from 'react'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const User = (props) => {
    if (props.user === undefined) {
        return null
    }
    const blogs = props.user.blogs
    const name = props.user.name
    return (
        <>
            <h2>{name}</h2>

            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="light" eventKey="0">
                            Added blogs
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup variant='flush'>
                            {blogs.map(blog =>
                                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
                        </ListGroup>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default connect()(User)