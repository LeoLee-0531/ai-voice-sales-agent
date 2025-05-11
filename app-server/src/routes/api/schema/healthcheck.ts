export const HealthcheckSchemas = {
  HealthCheck: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        example: 'ok',
      },
    },
  },
}
