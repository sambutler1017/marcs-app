export interface Manager {
  id: number;
  regionalId: number;
  name: string;
  storeId: string;
  storeName: string;
  startDate: Date | string;
  endDate: Date | string;
}

export interface ManagerDetail {
  id: number;
  regionalId: number;
  name: string;
  storeId: string;
  storeName: string;
  hireDate: Date | string;
  storeManager: boolean;
  vacations: Vacation[];
}

export interface Vacation {
  id: number;
  startDate: Date | string;
  endDate: Date | string;
}
