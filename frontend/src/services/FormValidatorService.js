import FormTypes from "@/constants/FormTypes";

export default class FormValidatorService {
  // Rules for form fields.
  // Each rule is a function that returns an object with a rule and a message.
  // The rule is a function that returns true if the value is valid, otherwise false.
  // The message is the error message that will be displayed if the value is invalid.
  static rules = {
    isRequired: (message) => ({
      rule: (value) => !!value,
      message,
    }),

    // String
    minLength: (minLength, message) => ({
      rule: (value) => value.length >= minLength,
      message,
    }),
    maxLength: (maxLength, message) => ({
      rule: (value) => value.length <= maxLength,
      message,
    }),

    // Numeric
    isNumeric: (message) => ({
      rule: (value) => !isNaN(value),
      message,
    }),
    largerThan: (minValue, message) => ({
      rule: (value) => value > minValue,
      message,
    }),
    largerOrEqualThan: (minValue, message) => ({
      rule: (value) => value >= minValue,
      message,
    }),
    smallerThan: (maxValue, message) => ({
      rule: (value) => value < maxValue,
      message,
    }),
    smallerOrEqualThan: (maxValue, message) => ({
      rule: (value) => value <= maxValue,
      message,
    }),

    // Regex
    isValidEmail: (message) => ({
      rule: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message,
    }),
  };

  // this method procides the validation rules for the form fields with the corresponding attributes
  static getValidationRules(formType) {
    switch (formType) {
      case FormTypes.INCREASE_BALANCE:
        return {
          amount: [
            FormValidatorService.rules.isRequired("Betrag darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Betrag muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Betrag muss größer als 0 sein."),
          ],
          payment_method: [FormValidatorService.rules.isRequired("Zahlungsmethode darf nicht leer sein.")],
        };

      case FormTypes.PURCHASE_TICKET:
        return {
          name: [FormValidatorService.rules.isRequired("Name darf nicht leer sein.")],
          address: [FormValidatorService.rules.isRequired("Adresse darf nicht leer sein.")],
          zip_code: [
            FormValidatorService.rules.isRequired("PLZ darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("PLZ muss eine Zahl sein."),
            FormValidatorService.rules.minLength(5, "PLZ ungültig."),
            FormValidatorService.rules.maxLength(5, "PLZ ungültig."),
          ],
          ticket_count: [
            FormValidatorService.rules.isRequired("Anzahl Tickets darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Anzahl Tickets muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Anzahl Tickets muss größer als 0 sein."),
          ],
        };

      case FormTypes.SIGNUP:
        return {
          full_name: [
            FormValidatorService.rules.isRequired("Name darf nicht leer sein."),
            FormValidatorService.rules.maxLength(255, "Name darf maximal 255 Zeichen lang sein."),
          ],
          email: [
            FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
            FormValidatorService.rules.isValidEmail("Email ist nicht gültig."),
            FormValidatorService.rules.maxLength(255, "Email darf maximal 255 Zeichen lang sein."),
          ],
          password: [
            FormValidatorService.rules.isRequired("Passwort darf nicht leer sein."),
            FormValidatorService.rules.minLength(8, "Passwort muss eine Mindestlänge von 8 Zeichen haben."),
            FormValidatorService.rules.maxLength(40, "Passwort darf maximal 40 Zeichen lang sein."),
          ],
          password_repeat: [FormValidatorService.rules.isRequired("Passwort wiederholen darf nicht leer sein.")],
        };

      case FormTypes.LOGIN:
        return {
          email: [
            FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
            FormValidatorService.rules.isValidEmail("Email ist nicht gültig"),
          ],
          password: [FormValidatorService.rules.isRequired("Passwort darf nicht leer sein.")],
        };

      case FormTypes.NEW_EVENT:
        return {
          title: [
            FormValidatorService.rules.isRequired("Name darf nicht leer sein"),
            FormValidatorService.rules.maxLength(255, "Name darf maximal 255 Zeichen lang sein."),
          ],
          description: [
            FormValidatorService.rules.isRequired("Beschreibung darf nicht leer sein."),
            FormValidatorService.rules.maxLength(1024, "Beschreibung darf maximal 1024 Zeichen lang sein."),
          ],
          base_price: [
            FormValidatorService.rules.isRequired("Preis darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Preis muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Preis muss größer als 0 sein."),
          ],
          pay_fee: [
            FormValidatorService.rules.isRequired("Gebühr darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Gebühr muss eine Zahl sein."),
            FormValidatorService.rules.largerOrEqualThan(1, "Gebühr muss größer oder gleich 1 sein."),
          ],
          total_tickets: [
            FormValidatorService.rules.isRequired("Anzahl Tickets darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Anzahl Tickets muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Anzahl Tickets muss größer als 0 sein."),
          ],
          threshold: [
            FormValidatorService.rules.isRequired("Erwartete Ticketverkäufe darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Erwartete Ticketverkäufe muss eine Zahl sein."),
            FormValidatorService.rules.largerOrEqualThan(0, "Erwartete Ticketverkäufe muss größer gleich 0 sein."),
          ],
          event_manager_email: [FormValidatorService.rules.isRequired("Event Manager darf nicht leer sein.")],
        };

      case FormTypes.NEW_VOUCHER:
        return {
          amount: [
            FormValidatorService.rules.isRequired("Betrag darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Betrag muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Betrag muss größer als 0 sein."),
          ],
          code_name: [
            FormValidatorService.rules.isRequired("Code darf nicht leer sein"),
            FormValidatorService.rules.maxLength(255, "Code darf maximal 255 Zeichen lang sein."),
          ],
          owner_email: [FormValidatorService.rules.isRequired("Kunden Email darf nicht leer sein.")],
        };

      case FormTypes.NEW_USER:
        return {
          full_name: [
            FormValidatorService.rules.isRequired("Name darf nicht leer sein."),
            FormValidatorService.rules.maxLength(255, "Name darf maximal 255 Zeichen lang sein."),
          ],
          email: [
            FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
            FormValidatorService.rules.isValidEmail("Email ist nicht gültig."),
            FormValidatorService.rules.maxLength(255, "Email darf maximal 255 Zeichen lang sein."),
          ],
          password: [
            FormValidatorService.rules.isRequired("Passwort darf nicht leer sein."),
            FormValidatorService.rules.minLength(8, "Passwort muss eine Mindestlänge von 8 Zeichen haben."),
            FormValidatorService.rules.maxLength(40, "Passwort darf maximal 40 Zeichen lang sein."),
          ],
          role: [FormValidatorService.rules.isRequired("Rolle darf nicht leer sein.")],
        };
    }
  }

  // this method validates the form data with the given validation rules
  static validateForm(formData, validationRules) {
    for (const attribute in validationRules) {
      const attributeRules = validationRules[attribute];
      const attributeValue = formData[attribute];

      for (const { rule, message } of attributeRules) {
        if (!rule(attributeValue)) {
          return message;
        }
      }
    }
  }
}
