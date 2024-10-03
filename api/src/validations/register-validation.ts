import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserRegisterRequestDTO } from '../dtos/users/auth/register-request-dto';

// Define Joi schema for validating user registration
const userRegisterSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': '"name" should be a type of text',
        'string.empty': '"name" cannot be an empty field',
        'any.required': '"name" is a required field',
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disable top-level domain (tld) validation if unnecessary
        .required()
        .messages({
            'string.base': '"email" should be a type of text',
            'string.empty': '"email" cannot be an empty field',
            'string.email': '"email" must be a valid email',
            'any.required': '"email" is a required field',
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': '"password" should be a type of text',
            'string.empty': '"password" cannot be an empty field',
            'string.min': '"password" should have a minimum length of 6 characters',
            'any.required': '"password" is a required field',
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password')) // Ensure confirmPassword matches password
        .required()
        .messages({
            'any.only': '"confirmPassword" must match "password"',
            'any.required': '"confirmPassword" is a required field',
        }),
});

// Function to validate user registration
export const validateUserRegistration = async (dto: UserRegisterRequestDTO, userService: IUserService) => {
    const { error } = userRegisterSchema.validate(dto, { abortEarly: false });
    
    if (error) {
        const validationErrors: Record<string, string[]> = {};
        // Collect all validation errors from Joi
        error.details.forEach((detail) => {
            const key = detail.path.join('.'); // Access the field that caused the error
            if (!validationErrors[key]) {
                validationErrors[key] = [];
            }
            validationErrors[key].push(detail.message); // Add error message to that field
        });

        return { valid: false, errors: validationErrors }; // Return the validation errors
    }

    // Check if the email is already in use
    const existingUser = await userService.getUserByEmail(dto.email);
    if (existingUser) {
        return {
            valid: false,
            errors: { email: ['The provided email address is already associated with another account. Please use a different email.'] },
        };
    }

    return { valid: true }; // If everything is valid, return true
};
