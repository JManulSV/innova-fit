import {create} from 'axios'

export const api = create({
  baseURL: 'http://192.168.3.158:8000/api',
  headers: {
    Accept: 'application/json',
  },
})