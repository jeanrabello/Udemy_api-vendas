import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationController from '../controllers/AuthenticationController';

const authenticationRoutes = Router();
const controller = new AuthenticationController();

authenticationRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create,
);

export default authenticationRoutes;
