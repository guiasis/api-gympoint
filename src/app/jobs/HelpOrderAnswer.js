import Mail from '../../lib/Mail';

class HelpOrderAnswer {
  get key() {
    return 'helpOrderAnswer';
  }

  async handle({ data }) {
    const { student, question, answer } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seu pedido de auxílio foi respondido',
      template: 'helpOrderAnswer',
      context: {
        student: student.name,
        question: question.question,
        answer,
      },
    });
  }
}

export default new HelpOrderAnswer();
