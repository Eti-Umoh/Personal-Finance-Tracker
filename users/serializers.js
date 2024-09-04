export const userSerializer = async (user) => {
    return {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "emailAddress": user.emailAddress,
        "createdAt": user.createdAt,
        "updatedAt": user.updatedAt
    };
};
