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
    dob: Joi.date()
        .greater('1-1-1900')
        .less('now')
        .required()
        .messages({
            'date.base': '"dob" should be a valid date',
            'date.empty': '"dob" cannot be an empty field',
            'date.greater': '"dob" must be a date after January 1, 1900',
            'date.less': '"dob" must be a date in the past',
            'any.required': '"dob" is a required field',
        }),
});

/**
 * Validates the user register request DTO.
 * @param dto - The UserRegisterRequestDTO containing register information.
 * @returns An object indicating whether validation succeeded and any validation errors.
 */
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
