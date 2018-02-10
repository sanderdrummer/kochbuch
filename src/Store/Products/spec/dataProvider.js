export const defaultProductOne = () => {
    return {
        name: 'product one',
        popularity: 0
    }
};

export const defaultProductTwo = () => {
    return {
        name: 'product two',
        popularity: 0
    }
};

export const initialState = () => {
    return {
        'product one': defaultProductOne()
    };
}

export const stateWithTwoProducts = () => {
    return {
        'product one': defaultProductOne(),
        'product two': defaultProductTwo(),  
    };
};