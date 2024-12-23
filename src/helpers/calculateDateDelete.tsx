import dayjs from "dayjs";

export const showExpirensIn = (day: string) => {
    const dateDeleteFromServer = Math.round((dayjs(day).diff(dayjs())/3600000)/24)
    if(dateDeleteFromServer<31) {
        let last_num = dateDeleteFromServer%10;
        if (dateDeleteFromServer > 10 && [11, 12, 13, 14].includes(dateDeleteFromServer%100)) return `${dateDeleteFromServer} дней`;
        if (last_num == 1) return `${dateDeleteFromServer} день`;
        if ([2,3,4].includes(last_num)) return `${dateDeleteFromServer} дня`;
        if ([5,6,7,8,9,0].includes(last_num)) return `${dateDeleteFromServer} дней`;
    };
    if(dateDeleteFromServer>=31 && dateDeleteFromServer<=365) {
        let last_num = Math.round(dateDeleteFromServer/31)%10;
        if (dateDeleteFromServer > 310 && [11, 12, 13, 14].includes(Math.round(dateDeleteFromServer/31))) return `${Math.round(dateDeleteFromServer/31)} месяцев`;
        if (last_num == 1) return `${Math.round(dateDeleteFromServer/31)} месяц`;
        if ([2,3,4].includes(last_num)) return `${Math.round(dateDeleteFromServer/31)} месяца`;
        if ([5,6,7,8,9,0].includes(last_num)) return `${Math.round(dateDeleteFromServer/31)} месяцев`;
    }
    if(dateDeleteFromServer>365) {
        let last_num = Math.round(dateDeleteFromServer/365)%10;
        if (dateDeleteFromServer > 10 && [11, 12, 13, 14].includes(Math.round(dateDeleteFromServer/365))) return `${Math.round(dateDeleteFromServer/365)} лет`;
        if (last_num == 1) return `${Math.round(dateDeleteFromServer/365)} год`;
        if ([2,3,4].includes(last_num)) return `${Math.round(dateDeleteFromServer/365)} года`;
        if ([5,6,7,8,9,0].includes(last_num)) return `${Math.round(dateDeleteFromServer/365)} лет`;
    } if(dateDeleteFromServer < 0) {
        return 'Просрочен'
    }
}