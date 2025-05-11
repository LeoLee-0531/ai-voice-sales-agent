import type { components } from './swagger'

export type AuthPermission = components['parameters']['AuthPermission']

export type AuthQueries = {
  permission: AuthPermission
}
