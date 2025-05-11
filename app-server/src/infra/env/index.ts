import * as envalid from 'envalid'

const env = envalid.cleanEnv(process.env, {
  JWT_SECRET: envalid.str(),
})

export default env
