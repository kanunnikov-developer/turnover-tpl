export const calcProductInfo = (lenght: number) => {
    if(lenght > 0) {
        let last_num = lenght%10;
        if (lenght > 10 && [11, 12, 13, 14].includes(lenght%100)) return `Продуктов`;
        if (last_num == 1) return `Продукт`;
        if ([2,3,4].includes(last_num)) return `Продукта`;
        if ([5,6,7,8,9,0].includes(last_num)) return `Продуктов`;
    } if(lenght == 0) {
        return 'Продуктов'
    }
}