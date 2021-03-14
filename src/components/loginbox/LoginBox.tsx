import React, { useRef, useState } from 'react';
import styles from './LoginBox.module.scss';
import UserStore from '../../stores/UserStore';
import Link from 'next/link';

function LoginBox() {
    const [dialogBoxStateValue, dialogBoxStateChange] = useState(null);
    const [rememberMeValue, rememberMeChange] = useState(true);
    const [userNameValue, userNameChange] = useState(
        UserStore.getUserData() ? UserStore.getUserData.name : null
    );
    const [emailValue, emailChange] = useState(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const tokenInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const baseUrl =
        'https://z1s06059b7.execute-api.eu-west-1.amazonaws.com/Implementation';

    const logoutUser = (event) => {
        event.preventDefault();
        userNameChange(null);
        UserStore.setUserData(null);
    };

    const loginUser = (event) => {
        event.preventDefault();
        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            }),
        };
        fetch(baseUrl + '/sign_in', postRequest)
            .then((res) => res.json())
            .then((data) => {
                dialogBoxStateChange(null);
                if (data.success) {
                    console.log('STORING ', data);
                    UserStore.setUserData(data);
                    userNameChange(data.username);
                }
            });
    };

    const confirmUser = (event) => {
        event.preventDefault();
        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailValue,
                token: tokenInputRef.current.value,
            }),
        };
        console.log('REQUEST: ', postRequest);
        fetch(baseUrl + '/sign_on', postRequest).then((res) => {
            dialogBoxStateChange(null);
        });
    };

    const registerUser = (event) => {
        event.preventDefault();
        console.log('REGISTRING: ', emailInputRef.current.value);
        emailChange(emailInputRef.current.value);

        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                name: nameInputRef.current.value,
            }),
        };
        fetch(baseUrl + '/sign_up', postRequest).then((res) => {
            dialogBoxStateChange('confirm');
        });
    };

    function credentialsForm() {
        return (
            <div className={styles.container}>
                <label htmlFor="uname">
                    <b>Email</b>
                </label>
                <input
                    ref={emailInputRef}
                    type="text"
                    placeholder="Uw email-adres"
                    name="uname"
                    required
                />

                <label htmlFor="psw">
                    <b>Wachtwoord</b>
                </label>
                <input
                    ref={passwordInputRef}
                    type="password"
                    placeholder="Uw wachtwoord"
                    name="psw"
                    required
                />

                {dialogBoxStateValue == 'login' ? (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                checked={true}
                                name="remember"
                                onChange={() =>
                                    rememberMeChange(!rememberMeValue)
                                }
                            />{' '}
                            Remember me
                        </label>
                        <span className={styles.psw}>
                            Wachtwoord <a href="#">vergeten?</a>
                        </span>
                    </>
                ) : (
                    <>
                        <label htmlFor="username">
                            <b>Naam</b>
                        </label>
                        <input
                            ref={nameInputRef}
                            type="text"
                            placeholder="Uw gebruikersnaam"
                            name="username"
                            required
                        />
                    </>
                )}
                <button type="submit" className={styles.login}>
                    {dialogBoxStateValue == 'register'
                        ? 'Registreren'
                        : 'Inloggen'}
                </button>
            </div>
        );
    }

    function confirmForm() {
        return (
            <div
                className={styles.container}
                style={{
                    backgroundColor: '#f1f1f1',
                }}
            >
                <label htmlFor="token">
                    <b>
                        Controleer uw email en vul uw registratieteken beneden
                        in
                    </b>
                </label>
                <input
                    ref={tokenInputRef}
                    type="text"
                    placeholder="Uw registratieteken"
                    name="token"
                    required
                />
                <button type="submit" className={styles.register}>
                    Bevestigen
                </button>
            </div>
        );
    }

    function dialogBox() {
        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <form
                        className={styles.modalContent + ' ' + styles.animate}
                        onSubmit={
                            dialogBoxStateValue == 'register'
                                ? registerUser
                                : dialogBoxStateValue == 'login'
                                ? loginUser
                                : confirmUser
                        }
                        method="POST"
                    >
                        <div
                            className={styles.imgcontainer + ' ' + styles.logo}
                        >
                            <span
                                onClick={() => dialogBoxStateChange(null)}
                                className={styles.close}
                                title="Close Modal"
                            >
                                &times;
                            </span>
                        </div>
                        {dialogBoxStateValue == 'confirm'
                            ? confirmForm()
                            : credentialsForm()}
                    </form>
                </div>
            </div>
        );
    }

    const header = userNameValue ? (
        <>
            Welkom
            <Link href={`/mijnbnr`}>
                <a className={styles.link}>{userNameValue}</a>
            </Link>{' '}
            <a className={styles.link} onClick={logoutUser}>
                Uitloggen
            </a>
        </>
    ) : (
        <>
            {dialogBoxStateValue ? dialogBox() : null}
            <a
                className={styles.link}
                onClick={() => dialogBoxStateChange('login')}
            >
                Login
            </a>
            of
            <a
                className={styles.link}
                onClick={() => dialogBoxStateChange('register')}
            >
                registreer
            </a>
        </>
    );

    return header;
}

export { LoginBox };
