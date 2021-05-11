export class Manager {
  id: number;
  regionalId: number;
  name: string;
  storeId: string;
  storeName: string;
  startDate: Date | string;
  endDate: Date | string;
}

export class ManagerDetail {
  id: number;
  regionalId: number;
  name: string;
  storeId: string;
  storeName: string;
  hireDate: Date | string;
  storeManager: boolean;
  vacations: Vacation[];
}

export class Vacation {
  id: number;
  startDate: Date | string;
  endDate: Date | string;
}
