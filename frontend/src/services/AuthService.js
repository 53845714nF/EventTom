import axios from 'axios';
import { ref } from 'vue';

export default class AuthService {

    // Text values for Buttons in AuthForm
    static signUpText = {
        title: "Willkommen bei EvenTom!",
        primaryButtonText: 'Registrieren',
        secondaryButtonText: 'Ich habe schon ein Konto',
    };

    static signInText = {
        title: "Willkommen zurück!",
        primaryButtonText: 'Login',
        secondaryButtonText: 'Ich habe noch kein Konto',
    };

    static provideDynamicAuthText(signUp){
        if (signUp) {
            return AuthService.signUpText;
        }else{
            return AuthService.signInText;
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

    static inputValuesCorrect(user, signUp){
    
        if (!(user.value.username && user.value.password)){
            console.log("Username or password empty.");
            return false;
        }

        if (signUp) {
            if (!(user.value.password === user.value.passwordRepeat)) {
                console.log("Passwords do not match.");
                return false;
            }

            if (!(user.value.password.length >= 8)) {
                console.log("Password too short.");
                return false;
            }

            if(!(user.value.email)){
                console.log("Email empty.");
                return false;
            }
        }

        return true;
    }

    static postUser(user, signUp){
        // Check if input values are correct
        if (!AuthService.inputValuesCorrect(user, signUp)) {
            return "Input not correct";
        }

        if (signUp) {
            console.log("Not implemented yet.")
        } else {
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
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}