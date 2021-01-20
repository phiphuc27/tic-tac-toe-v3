export const formatName = (profile) => {
    if (!profile.firstName && !profile.lastName) return profile.user.username;

    return profile.firstName.concat(' ', profile.lastName);
};
