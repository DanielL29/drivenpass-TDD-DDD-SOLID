interface CheckValue {
  message?: string;
  checked: boolean;
}

export class Check {
  private static callBadRequest(message: string): CheckValue {
    return {
      checked: false,
      message,
    };
  }

  private static callGoodRequest(): CheckValue {
    return {
      checked: true,
    };
  }

  public static checkAllValues(values: CheckValue[]): CheckValue {
    const value = values.find((checkValue) => !checkValue.checked);

    if (!value) {
      return { checked: true };
    }

    return value;
  }

  public static notEmpty(input: string, inputName: string): CheckValue {
    if (input.length === 0) {
      return this.callBadRequest(`${inputName} cannot be empty`);
    }

    return this.callGoodRequest();
  }

  public static minimumLength(
    length: number,
    input: string,
    inputName: string
  ): CheckValue {
    if (input.length < length) {
      return this.callBadRequest(
        `${inputName} must have at least ${length} characters length`
      );
    }

    return this.callGoodRequest();
  }

  public static isEmail(input: string, inputName: string): CheckValue {
    const emailRegex = /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (emailRegex.test(input) === false) {
      return this.callBadRequest(`${inputName} must be a valid email`);
    }

    return this.callGoodRequest();
  }

  public static isUrl(input: string, inputName: string): CheckValue {
    const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

    if (urlRegex.test(input) === false) {
      return this.callBadRequest(`${inputName} must be a valid url`);
    }

    return this.callGoodRequest();
  }

  public static maximumLength(
    length: number,
    input: string,
    inputName: string
  ): CheckValue {
    if (input.length > length) {
      return this.callBadRequest(
        `${inputName} must have at most ${length} characters length`
      );
    }

    return this.callGoodRequest();
  }

  public static isNumber(input: any, inputName: string): CheckValue {
    const numberRegex = /[0-9]/;

    if (numberRegex.test(input) === false) {
      return this.callBadRequest(`${inputName} must have only numbers`);
    }

    return this.callGoodRequest();
  }

  public static validateDateFormat(
    input: string,
    inputName: string
  ): CheckValue {
    const dateRegex = /^([0-9]{2})\/?([0-9]{2})$/;

    if (dateRegex.test(input) === false) {
      return this.callBadRequest(`${inputName} must have format: MM/YY`);
    }

    return this.callGoodRequest();
  }

  public static verifyDateRange(input: string, inputName: string): CheckValue {
    const date = input.split("/");
    const currentYear = new Date().getFullYear();
    const formattedYear = Number(currentYear.toString().slice(2, 4));

    if (Number(date[0]) > 12 || Number(date[0]) <= 0) {
      return this.callBadRequest(
        `${inputName} must be a valid month between 01-12`
      );
    } else if (Number(date[1]) < formattedYear) {
      return this.callBadRequest(
        `${inputName} must be greater than or equal to the current year: ${currentYear} (${formattedYear})`
      );
    }

    return this.callGoodRequest();
  }

  public static isBoolean(input: any, inputName: string): CheckValue {
    if (typeof input !== "boolean") {
      return this.callBadRequest(
        `${inputName} must be a boolean true or false`
      );
    }

    return this.callGoodRequest();
  }

  public static validateCardType(input: string, inputName: string): CheckValue {
    const cardTypesRegex = /[CREDIT]|[DEBIT]|[BOTH]/;

    if (cardTypesRegex.test(input) === false) {
      return this.callBadRequest(`${inputName} must be CREDIT | DEBIT | BOTH`);
    }

    return this.callGoodRequest();
  }
}
