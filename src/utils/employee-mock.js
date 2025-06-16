import { faker } from '@faker-js/faker';

const DEPARTMENTS = ['Analytics', 'Tech'];
const POSITIONS = ['Junior', 'Medior', 'Senior'];

export function generateEmployee() {
  return {
    id: faker.string.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfEmployment: faker.date.past(10).toISOString().split('T')[0],
    dateOfBirth: faker.date.birthdate({ min: 1960, max: 2002, mode: 'year' }).toISOString().split('T')[0],
    phoneNumber: faker.phone.number('+90 5## ### ## ##'),
    email: faker.internet.email(),
    department: faker.helpers.arrayElement(DEPARTMENTS),
    position: faker.helpers.arrayElement(POSITIONS),
  };  
}

export function generateEmployees(count = 10) {
  return Array.from({ length: count }, () => generateEmployee() );
}
