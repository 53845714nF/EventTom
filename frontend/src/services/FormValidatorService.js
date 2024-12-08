import FormInput from "@/components/Basic/FormInput.vue";
import FormTypes from "@/constants/FormTypes";

export default class FormValidatorService {
    static rules = {
        isRequired: (message) => ({
            rule: (value) => !!value,
            message
        }),

        // String
        minLength: (minLength, message) => ({
            rule: (value) => value.length >= minLength,
            message
        }),
        maxLength: (maxLength, message) => ({
            rule: (value) => value.length <= maxLength,
            message
        }),

        // Numeric
        isNumeric: (message) => ({
            rule: (value) => !isNaN(value),
            message
        }),
        largerThan: (minValue, message) => ({
            rule: (value) => value > minValue,
            message
        }),
        largerOrEqualThan: (minValue, message) => ({
            rule: (value) => value >= minValue,
            message
        }),
        smallerThan: (maxValue, message) => ({
            rule: (value) => value < maxValue,
            message
        }),
        smallerOrEqualThan: (maxValue, message) => ({
            rule: (value) => value <= maxValue,
            message
        }),

        // Regex
        isValidEmail: (message) => ({
            rule: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message
        }),
    }

    static getValidationRules(formType) {
        switch (formType) {

            case FormTypes.LOGIN: 
                return {
                    title: [
                        FormValidatorService.rules.isRequired("Name darf nicht leer sein"),
                    ],
                    description: [
                        FormValidatorService.rules.isRequired("Beschreibung darf nicht leer sein."),
                    ],
                    base_price: [
                        FormValidatorService.rules.isRequired("Preis darf nicht leer sein."),
                        FormValidatorService.rules.isNumeric("Preis muss eine Zahl sein."),
                        FormValidatorService.rules.largerThan(0, "Preis muss größer als 0 sein."),
                    ],
                    threshold: [
                        FormValidatorService.rules.isRequired("Threshold darf nicht leer sein."),
                        FormValidatorService.rules.isNumeric("Threshold muss eine Zahl sein."),
                        FormValidatorService.rules.largerOrEqualThan(0, "Threshold muss größer gleich 0 sein."),
                        FormValidatorService.rules.smallerOrEqualThan(1, "Threshold muss kleiner gleich 1 sein."),
                    ],
                    event_manager_email: [
                        FormValidatorService.rules.isRequired("Event Manager darf nicht leer sein."),
                    ]
                }
            
            case FormTypes.NEW_EVENT: 
                return {
                    title: [
                        FormValidatorService.rules.isRequired("Name darf nicht leer sein"),
                    ],
                    description: [
                        FormValidatorService.rules.isRequired("Beschreibung darf nicht leer sein."),
                    ],
                    base_price: [
                        FormValidatorService.rules.isRequired("Preis darf nicht leer sein."),
                        FormValidatorService.rules.isNumeric("Preis muss eine Zahl sein."),
                        FormValidatorService.rules.largerThan(0, "Preis muss größer als 0 sein."),
                    ],
                    threshold: [
                        FormValidatorService.rules.isRequired("Threshold darf nicht leer sein."),
                        FormValidatorService.rules.isNumeric("Threshold muss eine Zahl sein."),
                        FormValidatorService.rules.largerOrEqualThan(0, "Threshold muss größer gleich 0 sein."),
                        FormValidatorService.rules.smallerOrEqualThan(1, "Threshold muss kleiner gleich 1 sein."),
                    ],
                    event_manager_email: [
                        FormValidatorService.rules.isRequired("Event Manager darf nicht leer sein."),
                    ]
                }

            case FormTypes.NEW_VOUCHER: 
                return {
                    amount: [
                        FormValidatorService.rules.isRequired("Betrag darf nicht leer sein."),
                        FormValidatorService.rules.isNumeric("Betrag muss eine Zahl sein."),
                        FormValidatorService.rules.largerThan(0, "Betrag muss größer als 0 sein."),
                    ],
                    code: [
                        FormValidatorService.rules.isRequired("Code darf nicht leer sein"),
                    ],
                    owner_email: [
                        FormValidatorService.rules.isRequired("Kunden Email darf nicht leer sein."),
                    ],
                }

            case FormTypes.NEW_USER: 
                return {
                    full_name: [
                        FormValidatorService.rules.isRequired("Name darf nicht leer sein."),
                    ],
                    email: [
                        FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
                        FormValidatorService.rules.isValidEmail("Email ist nicht gültig."),
                    ],
                    password: [
                        FormValidatorService.rules.isRequired("Passwort darf nicht leer sein."),
                        FormValidatorService.rules.minLength(8, "Passwort muss eine Mindestlänge von 8 Zeichen haben."),
                    ],
                    role: [
                        FormValidatorService.rules.isRequired("Rolle darf nicht leer sein."),
                    ],
                }
        }
    }

    static validateForm(formData, validationRules) {
        for (const attribute in validationRules) {
            const attributeRules = validationRules[attribute];
            const attributeValue = formData[attribute];

            for (const {rule, message} of attributeRules) {
                if (!rule(attributeValue)) {
                    return message;
                }
            }
        }
    }
}