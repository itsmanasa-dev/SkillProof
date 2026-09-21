export type ApiError = {
  status: number
  statusText: string
  message: string
}

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function buildError(res: Response): ApiError {
  return {
    status: res.status,
    statusText: res.statusText,
    message: `${res.status} ${res.statusText}`,
  }
}

/**
 * Centralized API client.
 *
 * All backend communication should go through this module so that the base
 * URL stays configurable via VITE_API_URL and never needs to be hardcoded
 * elsewhere in the application.
 *
 * Feature-specific services (auth, assessment, evaluation, ...) can build on
 * top of these helpers later, for example in `src/services/`.
 */
export const api = {
  baseUrl: API_BASE_URL,

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, init)
    if (!res.ok) {
      throw buildError(res)
    }
    return res.json() as Promise<T>
  },

  async post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      ...init,
    })
    if (!res.ok) {
      throw buildError(res)
    }
    return res.json() as Promise<T>
  },

  async put<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      ...init,
    })
    if (!res.ok) {
      throw buildError(res)
    }
    return res.json() as Promise<T>
  },

  async delete<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      ...init,
    })
    if (!res.ok) {
      throw buildError(res)
    }
    return res.json() as Promise<T>
  },
}
