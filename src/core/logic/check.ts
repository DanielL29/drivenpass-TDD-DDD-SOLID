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
        `${inputName} must be at minimum ${length} length`
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
}
