import { faker } from "@faker-js/faker";
import { type Invoice } from "../interfaces/Invoice";

export const generateUniqueId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);

  // const today = new Date();
  // const day = String(today.getDate()).padStart(2, "0");
  // const month = String(today.getMonth() + 1).padStart(2, "0");
  // const year = today.getFullYear();

  return randomNumber;
};

export const getDueDateString = (invoiceDate: Date, paymentTerms: string) => {
  const invoiceDueDate = new Date(invoiceDate);

  invoiceDueDate.setDate(invoiceDueDate.getDate() + Number(paymentTerms));

  return invoiceDueDate.toLocaleDateString();
};

export const getFakerUser = () => {
  const email = faker.internet.email({ provider: "fakemail.com" });
  const password = faker.internet.password();

  return { email, password };
};

export const getFakerInvoice = () => {
  faker.seed();
  const billFrom = {
    street: faker.location.street(),
    city: faker.location.city(),
    postCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  faker.seed();
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  faker.seed();
  const billTo = {
    name: `${firstName} ${lastName}`,
    email: email,
    street: faker.location.street(),
    city: faker.location.city(),
    postCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  const fakerInvoice: Invoice = {
    id: generateUniqueId(),
    status: faker.helpers.arrayElement(["draft", "pending", "paid"]),
    billFrom,
    billTo,
    invoiceDate: faker.date.soon(),
    paymentTerms: faker.helpers.arrayElement(["1", "7", "14", "30"]),
    projectDescription: faker.lorem.sentence(),
    itemsList: Array.from(
      { length: Math.floor(Math.random() * 7) + 1 },
      () => ({
        itemName: faker.commerce.productName(),
        quantity: Math.floor(Math.random() * 10) + 1,
        price: parseFloat(faker.commerce.price({ min: 1, max: 100 })),
      }),
    ),
  };

  return fakerInvoice;
};

/**
 * Function takes user creation date and returns a coresponding number that will be used for avatar ID.
 * The function has a minimalistic logic, considers the second in time the user was created as avatar ID.
 * @param userCreationDate expects user.created_at
 * @returns random number from 0 to 14, which will be persistent for each user
 */
export const getUserAvatarID = (userCreationDate: string | undefined) => {
  if (userCreationDate === undefined) {
    return "default-user";
  }

  function getNumberFromSet(n: number) {
    if (n < 15) return n;
    return getNumberFromSet(n - 15);
  }

  const date = new Date(userCreationDate);
  const second = date.getSeconds() + 1;

  if (second > 14) {
    return getNumberFromSet(second).toString();
  }

  return second.toString();
};
