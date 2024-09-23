/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:jPZxuv6H8QEb@ep-blue-boat-a5i4pxzk.us-east-2.aws.neon.tech/Smartprep?sslmode=require",
    }
  };