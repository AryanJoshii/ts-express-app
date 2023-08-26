const dbConnection = (database_uri: string) => {
    try {
        console.log(`connected to ${database_uri}`);
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;