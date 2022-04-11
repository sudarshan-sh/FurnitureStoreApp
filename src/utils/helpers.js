
export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: 'USD'
    }).format(number / 100);
}

export const getUniqueValues = (data,type) => {
    // get us all the items of type which we are passing or clicking
    let unique = data.map((item) => item[type])
    if(type === 'colors'){
        unique = unique.flat();
    }
    return ['all',...new Set(unique)]
}