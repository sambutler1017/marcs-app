export class User {
  personal: {
    firstName: string;
    lastName: string;
    region: string;
    email: string;
  };
  security: {
    question: string;
    answer: string;
    webRole: string;
  };
}
