import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserRequestDTO } from '../dtos/users/user-request-dto';

// Define the user validation schema using Joi
const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': '"name" should be a type of text',
        'string.empty': '"name" cannot be an empty field',
        'any.required': '"name" is a required field',
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disallow top-level domain checking
        .required()
        .messages({
            'string.base': '"email" should be a type of text',
            'string.empty': '"email" cannot be an empty field',
            'string.email': '"email" must be a valid email',
            'any.required': '"email" is a required field',
        }),
    password: Joi.string()
        .min(6) // Minimum password length
        .required()
        .messages({
            'string.base': '"password" should be a type of text',
            'string.empty': '"password" cannot be an empty field',
            'string.min': '"password" should be at least 6 characters long',
            'any.required': '"password" is a required field',
        }),
    image: Joi.string().optional().allow(''), // Optional image field
    phone: Joi.string().optional().allow(''), // Optional phone field
    isAdmin: Joi.number().integer().valid(0, 1).optional().default(0).messages({
        'number.base': '"isAdmin" should be a type of integer',
        'any.only': '"isAdmin" must be either 0 (not admin) or 1 (admin)',
    }),
    status: Joi.number().integer().valid(0, 1).optional().default(1).messages({
        'number.base': '"status" should be a type of integer',
        'any.only': '"status" must be either 0 (inactive) or 1 (active)',
    }),
});

// Validation function
export const validateUser = async (dto: UserRequestDTO, userService: IUserService) => {
    // Validate the user DTO against the schema
    const { error } = userSchema.validate(dto, { abortEarly: false });
    if (error) {
        // Initialize an object to hold validation errors
        const validationErrors: Record<string, string[]> = {};
        
        // Process each error detail and group them by key
        error.details.forEach((detail) => {
            const key = detail.path.join('.');
            if (!validationErrors[key]) {
                validationErrors[key] = [];
            }
            validationErrors[key].push(detail.message);
        });

        return { valid: false, errors: validationErrors };
    }

    // Check if the email already exists in the database
    const existingUser = await userService.getUserByEmail(dto.email);
    if (existingUser) {
        return {
            valid: false,
            errors: {
                email: ['The provided email address is already associated with another account. Please use a different email.'],
            },
        };
    }

    return { valid: true };
};
