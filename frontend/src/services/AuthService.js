import axios from 'axios';
import { ref } from 'vue';
import ToasterService from './ToasterService';
import router from '@/router';

export default class AuthService {

    // Text values for Buttons in AuthForm
    static _signUpText = {
        title: "Willkommen bei EvenTom!",
        primaryButtonText: 'Registrieren',
        secondaryButtonText: 'Ich habe schon ein Konto',
    };

    static _signInText = {
        title: "Willkommen zurück!",
        primaryButtonText: 'Login',
        secondaryButtonText: 'Ich habe noch kein Konto',
    };

    static provideDynamicAuthText(signUp){
        if (signUp) {
            return this._signUpText;
        }else{
            return this._signInText;
        }
    }

    static provideEmptyUser(){
        return ref({
            username: "",
            email: "",
            password: "", 
            passwordRepeat: "",
        })
    }

    static _checkIfInputValuesCorrect(user, signUp){
    
        if (!(user.value.username && user.value.password)){
            return {isValid: false, message: "Keine leeren Felder erlaubt."};
        }

        if (signUp) {
            if (!(user.value.password === user.value.passwordRepeat)) {
                return {isValid: false, message: "Passwörter stimmen nicht überein."};
            }

            if (!(user.value.password.length >= 8)) {
                return {isValid: false, message: "Passwort zu kurz. Mindestens 8 Zeichen."};
            }

            if(!(user.value.email)){
                return {isValid: false, message: "Bitte geben Sie eine gültige E-Mail Adresse an."};
            }
        }

        return {isValid: true, message: ""};
    }

    static postUser(user, signUp, redirectPath){

        const validationResult = this._checkIfInputValuesCorrect(user, signUp);

        // Check if input values are correct
        if (!validationResult.isValid) {
            ToasterService.createToasterPopUp('error', validationResult.message);
            return;
        }

        console.log("postLogin");

        if (signUp) {
            console.log("not implemented yet")
            ToasterService.createToasterPopUp('error', 'Sign up not implemented yet.');
        } else {
            console.log("postLogin");
            this.postLogin(user, redirectPath);
        }
    }

    static postLogin(user, redirectPath){
        console.log("postLogin");
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', user.value.username); // beachte die URL-kodierte Form
        data.append('password', user.value.password);
        data.append('scope', '');
        data.append('client_id', 'string');
        data.append('client_secret', 'string');
        
        // send api request of type application/x-www-form-urlencoded
        axios.post('/api/v1/login/access-token', data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log(response);
            router.push(redirectPath);
            ToasterService.createToasterPopUp('success', 'Login erfolgreich!');
        })
        .catch(error => {
            console.log(error);
            ToasterService.createToasterPopUp('error', 'Falscher Username oder Passwort.');
        });
    }
}