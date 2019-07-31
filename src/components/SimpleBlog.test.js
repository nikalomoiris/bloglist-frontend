import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders the title, author and amount of likes', () => {
    const blog = {
        title: 'A blog for testing',
        author: 'Nikos Kalomoiris',
        likes: '10'
    };

    const component = render(
        <SimpleBlog blog={blog} />
    );
    const titleDiv = component.container.querySelector('.titleAuthor');
    console.log(prettyDOM(titleDiv));

    const likesDiv = component.container.querySelector('.likes');
    console.log(prettyDOM(likesDiv));

    expect(component.container).toHaveTextContent(
        'A blog for testing Nikos Kalomoiris'
    );

    expect(component.container).toHaveTextContent(
        'blog has 10 likes'
    );
});

test('if the like button of a component is pressed twice, the event handler is called twice', () => {
    const blog = {
        title: 'A blog for testing',
        author: 'Nikos Kalomoiris',
        likes: '10'
    };

    const mockHandler = jest.fn();

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
});