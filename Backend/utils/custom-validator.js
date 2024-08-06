import { body, param, query, validationResult } from "express-validator";

const validators = {
  ":": param,
  "?": query,
  "@": body,
};

function check(key) {
  const validator = validators[key.at(0)];
  if (!validator)
    throw new Error(
      "Missing type of key, append - [: for param] | [? for query] | [@ for body]"
    );
  return validator(key.slice(1));
}

export function validateEmail(key) {
  return check(key)
    .optional()
    .toLowerCase()
    .isEmail()

    .withMessage("invalid email id");
}
export function validatePassword(key) {
  return check(key)
    .optional()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      maxLength: 32,
    })
    .withMessage(
      "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
    );
}

export function validateEnum(key, type) {
  if (!type?.enum || !key)
    throw new Error("invalid or no (type or key) passed to validate");

  return check(key)
    .optional()
    .toLowerCase()
    .isIn(type.enum)
    .withMessage(`${key.slice(1)} can be - ${type.enum.join(" | ")}`);
}

export function validateArray(key, required = false) {
  if (!required)
    return check(key)
      .optional()
      .isArray()
      .withMessage(`${key.slice(1)} must be an array`);
  return check(key)
    .isArray()
    .withMessage(`${key.slice(1)} must be an array`)
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}

export function validateNumber(key, config) {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 0.1,
    max: config?.max || Infinity,
  };

  if (!config?.required)
    return check(key)
      .optional()
      .isNumeric(newConfig)
      .withMessage(
        `${key.slice(1)} must be between ${newConfig?.min}-${newConfig?.max}`
      );

  return check(key)
    .isNumeric(newConfig)
    .withMessage(
      `${key.slice(1)} must be between ${newConfig?.min}-${newConfig?.max}`
    )
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}

export function validateString(key, config) {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 1,
    max: config?.max || 500,
  };

  if (!config?.required)
    return check(key)
      .optional()
      .isLength(newConfig)
      .withMessage(
        `${key.slice(1)} must be ${newConfig?.min}-${newConfig?.max} characters`
      );
  return check(key)
    .isLength(newConfig)
    .withMessage(
      `${key.slice(1)} must be ${newConfig?.min}-${newConfig?.max} characters`
    )
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}
export function validateDate(key, required = false) {
  if (!required)
    return check(key)
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage(`${key.slice(1)} must be a valid date, format YYYY-MM-DD`);
  return check(key)
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage(`${key.slice(1)} must be a valid date, format YYYY-MM-DD`)
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}
export function validatePhone(key, required = false) {
  if (!required)
    return check(key)
      .optional()
      .isMobilePhone()
      .withMessage("invalid phone number");

  return check(key)
    .isMobilePhone()
    .withMessage("invalid phone number")
    .notEmpty()
    .withMessage(`${key.slice(1)} required`);
}
