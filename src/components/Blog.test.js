import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

let component;

afterEach(cleanup);

beforeEach(() => {
    component = render(
        <Blog title='Testing Blog component'
            author='Nikos'
            url='www.test.com'
            blogLikes='10'
            username='virus' />
    );
});

test('should initially show only the name and the author of the blog post', () => {
    const div = component.container.querySelector('.blogDetails');
    expect(div).toHaveStyle('display: none');
});

test('should display the blog details after clicking the title', () => {
    const title = component.container.querySelector('.title');
    fireEvent.click(title);

    const div = component.container.querySelector('.blogDetails');
    expect(div).not.toHaveStyle('display: none');
});

