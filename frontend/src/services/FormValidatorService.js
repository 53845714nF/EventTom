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
      case FormTypes.PURCHASE_TICKET:
        // Adding validation rules for the PURCHASE_TICKET form
        return {
          name: [FormValidatorService.rules.isRequired("Name darf nicht leer sein.")],
          address: [FormValidatorService.rules.isRequired("Adresse darf nicht leer sein.")],
          cityZip: [
            FormValidatorService.rules.isRequired("PLZ, Ort darf nicht leer sein."),
            FormValidatorService.rules.minLength(5, "PLZ, Ort muss mindestens 5 Zeichen lang sein."),
          ],
          ticketCount: [
            FormValidatorService.rules.isRequired("Anzahl Tickets darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Anzahl Tickets muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Anzahl Tickets muss größer als 0 sein."),
          ],
          voucherCode: [], // Optional field, so no validation rules are needed
        };
      case FormTypes.SIGNUP:
        return {
          full_name: [FormValidatorService.rules.isRequired("Name darf nicht leer sein.")],
          email: [
            FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
            FormValidatorService.rules.isValidEmail("Email ist nicht gültig."),
          ],
          password: [
            FormValidatorService.rules.isRequired("Passwort darf nicht leer sein."),
            FormValidatorService.rules.minLength(8, "Passwort muss eine Mindestlänge von 8 Zeichen haben."),
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
          title: [FormValidatorService.rules.isRequired("Name darf nicht leer sein")],
          description: [FormValidatorService.rules.isRequired("Beschreibung darf nicht leer sein.")],
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
          count: [
            FormValidatorService.rules.isRequired("Anzahl Tickets darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Anzahl Tickets muss eine Zahl sein."),
            FormValidatorService.rules.largerThan(0, "Anzahl Tickets muss größer als 0 sein."),
          ],
          threshold: [
            // TODO: Threshold darf nicht größer als die Anzahl der Tickets sein
            FormValidatorService.rules.isRequired("Threshold darf nicht leer sein."),
            FormValidatorService.rules.isNumeric("Threshold muss eine Zahl sein."),
            FormValidatorService.rules.largerOrEqualThan(0, "Threshold muss größer gleich 0 sein."),
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
          code_name: [FormValidatorService.rules.isRequired("Code darf nicht leer sein")],
          owner_email: [FormValidatorService.rules.isRequired("Kunden Email darf nicht leer sein.")],
        };

      case FormTypes.NEW_USER:
        return {
          full_name: [FormValidatorService.rules.isRequired("Name darf nicht leer sein.")],
          email: [
            FormValidatorService.rules.isRequired("Email darf nicht leer sein"),
            FormValidatorService.rules.isValidEmail("Email ist nicht gültig."),
          ],
          password: [
            FormValidatorService.rules.isRequired("Passwort darf nicht leer sein."),
            FormValidatorService.rules.minLength(8, "Passwort muss eine Mindestlänge von 8 Zeichen haben."),
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

  // Adding validation rules for the PURCHASE_TICKET form



}
