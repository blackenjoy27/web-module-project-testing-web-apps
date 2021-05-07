import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,"abcd");

    const error = screen.getByTestId("error");
    expect(error).toBeTruthy();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const btn = screen.getByTestId("btn");
    userEvent.click(btn);

    const errors = screen.getAllByTestId("error");
    expect(errors).toHaveLength(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,"Kevin");

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName,"Li");

    const btn = screen.getByTestId("btn");
    userEvent.click(btn);

    const error = screen.getByTestId("error");
    expect(error).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email,"invalid.com");
    
    const errorMsg = screen.getByText(/email must be a valid email address/i);
    expect(errorMsg).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const btn = screen.getByTestId("btn");
    userEvent.click(btn);

    const errorMsg = screen.getByText(/lastName is a required field/i);
    expect(errorMsg).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,"Kevin");

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName,"Li");

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email,"invalid@gmail.com");

    const btn = screen.getByTestId("btn");
    userEvent.click(btn);

    const msg = screen.queryByTestId("messageDisplay");
    expect(msg).toBeFalsy();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,"Kevin");

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName,"Li");

    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email,"invalid@gmail.com");

    const message = screen.getByTestId("msg");
    userEvent.type(message, "This is a message for demo");

    const btn = screen.getByTestId("btn");
    userEvent.click(btn);

    const fName = screen.getByTestId("firstnameDisplay");
    expect(fName).toHaveTextContent(/kevin/i);

    const lName = screen.getByTestId("lastnameDisplay");
    expect(lName).toHaveTextContent(/li/i);

    const mail = screen.getByTestId("emailDisplay");
    expect(mail).toHaveTextContent(/invalid@gmail.com/);
    
    const msg = screen.getByTestId("messageDisplay");
    expect(msg).toHaveTextContent("This is a message for demo");
});