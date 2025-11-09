export const formatDate = (strDate: string = '', format: string = '') => {
    switch (format) {
        case 'date-dm':
            const dateDm = new Date(strDate);
            return (dateDm.getDate().toString().padStart(2, '0') + '/' + (dateDm.getMonth() + 1).toString().padStart(2, '0'));
        case 'date-dma':
            const dateDma = new Date(strDate);
            return (dateDma.getDate().toString().padStart(2, '0') + '/' + (dateDma.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDma.getFullYear().toString());
        case 'date-dmah':
            const dateDmah = new Date(strDate);
            return (dateDmah.getDate().toString().padStart(2, '0') + '/' + (dateDmah.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDmah.getFullYear().toString()+ dateDmah.getHours().toString().padStart(2, '0') + ':' + dateDmah.getMinutes().toString().padStart(2, '0'));
        default:
            return strDate;
    }
}

export const formatNumber = (num: number) => {
    if (num === null || num === undefined) {
        return '0';
    }
    return Math.trunc(num).toLocaleString('en-US').replace(/,/g, '.');
}