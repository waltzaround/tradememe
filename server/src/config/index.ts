export default {
    port: process.env.PORT || 8080,
    databaseUrl: process.env.DB_URI || "mongodb://localhost:27017/tradememe"
}