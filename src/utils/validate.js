export const isNullOrEmpty = (value) => {
    return (value === '' || 
            value === null || 
            value === undefined || 
            value === 0 ||
            value.length === 0
        );
};

export const isNotNullOrEmpty = (value) => {
    return !isNullOrEmpty(value);
}