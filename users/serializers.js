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


export const usersSerializer = async (users) => {
    const serializedUsers = users.map(user => userSerializer(user));
    return serializedUsers;
};
