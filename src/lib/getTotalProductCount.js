const getTotalProductCount = (variants) => {
    let totalProductCount = 0
    for (let variant of variants) {
        totalProductCount = totalProductCount + Number(variant.quantity)
    }
    return totalProductCount
};

export default getTotalProductCount;