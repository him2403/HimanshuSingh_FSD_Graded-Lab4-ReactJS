import axios from 'axios';
import IDataList from '../model/IDataList';

export interface IDataItem {
  id: number;
  payeeName: string;
  product: string;
  price: number;
  setDate: string;
  
}

const BASE_URL = 'http://localhost:3001'; 

export const getDataFromServer = async (): Promise<IDataItem[]> => {
  try {
    const response = await axios.get<IDataItem[]>(`${BASE_URL}/items`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the server');
  }
};

export const pushDataIntoServer = async (data: Omit<IDataItem, 'id'>): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/items`, data);
  } catch (error) {
    throw new Error('Error pushing data to the server');
  }
};
