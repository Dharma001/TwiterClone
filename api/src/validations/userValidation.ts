import Joi from 'joi'; //made alredy gloable do i have to use hgere as well
import { UserRequestDTO } from '../dtos/users/user-request-dto';

// Validation schema for user creation and update
const userSchema = Joi.object({
    name: Joi.string().optional(),  // Optional field for updates
    email: Joi.string().email().required(),
});

export const validateUser = (dto: UserRequestDTO) => {
    return userSchema.validate(dto);
};
