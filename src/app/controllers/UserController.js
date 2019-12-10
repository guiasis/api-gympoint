import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required(),
      weight : Yup.number()
      .required(),
      height : Yup.number()
      .required(),
    });



    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, age, height,weight } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight
    });
  }
  
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, name } = req.body;

    const user = await User.findByPk(req.userId);
  
    const { age, height, weight } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight
    });
  }

}


export default new UserController();
