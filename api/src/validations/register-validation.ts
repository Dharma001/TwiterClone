import Joi from 'joi';
import { IUserService } from '../contracts/IUserService';
import { UserRegisterRequestDTO } from '../dtos/users/auth/register-request-dto';

const userRegisterSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': '"name" should be a type of text',
        'string.empty': '"name" cannot be an empty field',
        'any.required': '"name" is a required field',
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
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
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': '"confirmPassword" must match "password"',
            'any.required': '"confirmPassword" is a required field',
        }),
});


export const validateUserRegistration = async (dto: UserRegisterRequestDTO, userService: IUserService) => {
    const { error } = userRegisterSchema.validate(dto, { abortEarly: false });
    
    if (error) {
        const validationErrors: Record<string, string[]> = {};
        error.details.forEach((detail) => {
            const key = detail.path.join('.');
            if (!validationErrors[key]) {
                validationErrors[key] = [];
            }
            validationErrors[key].push(detail.message);
        });

        return { valid: false, errors: validationErrors };
    }

    const existingUser = await userService.getUserByEmail(dto.email);
    if (existingUser) {
        return {
            valid: false,
            errors: { email: ['The provided email address is already associated with another account. Please use a different email.'] },
        };
    }

    return { valid: true };
};
