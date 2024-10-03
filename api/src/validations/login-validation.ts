// src/validators/userLoginValidator.ts
import Joi from 'joi';
import { UserLoginRequestDTO } from '../dtos/users/auth/login-request-dto';

const userLoginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disallow top-level domains
        .required()
        .messages({
            'string.base': '"email" should be a type of text',
            'string.empty': '"email" cannot be an empty field',
            'string.email': '"email" must be a valid email',
            'any.required': '"email" is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': '"password" should be a type of text',
            'string.empty': '"password" cannot be an empty field',
            'any.required': '"password" is a required field',
        }),
});

/**
 * Validates the user login request DTO.
 * @param dto - The UserLoginRequestDTO containing login information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
export const validateUserLogin = async (dto: UserLoginRequestDTO) => {
    const { error } = userLoginSchema.validate(dto, { abortEarly: false }); // Validate and collect all errors
    
    if (error) {
        const validationErrors: Record<string, string[]> = {};

        // Process each error detail and group them by field
        error.details.forEach((detail) => {
            const key = detail.path.join('.'); // Get the key of the error
            if (!validationErrors[key]) {
                validationErrors[key] = [];
            }
            validationErrors[key].push(detail.message); // Push the error message
        });

        return { valid: false, errors: validationErrors }; // Return errors if validation fails
    }

    return { valid: true }; // Return success if validation passes
};
