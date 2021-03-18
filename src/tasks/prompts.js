import inquirer from 'inquirer'

const password = async () => {
  const answers = await inquirer.prompt([{
    name: 'password',
    type: 'password',
    message: 'Enter account password',
    validate: string => string?.length >= 8
  }])

  return answers.password
}

export default { password }
