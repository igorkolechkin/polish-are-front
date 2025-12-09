import axios from 'axios'
import { CONFIG } from '@shared/config.ts'

const base = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export default base
