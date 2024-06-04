const dateNow = new Date();
const month = (dateNow.getMonth() + 1).toString().length === 1 ? `0${(dateNow.getMonth() + 1)}` : (dateNow.getMonth() + 1).toString();
const day = (dateNow.getDate()).toString().length === 1 ? `0${(dateNow.getDate())}` : (dateNow.getDate()).toString();
export const generalCurrentDate = `${dateNow.getFullYear()}-${month}-${day}`.toString();

export const generalParseDate = (dateStr: string): string => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            const date = new Date(year, month - 1, day);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
        }
    }
    return '';
}

export const generalParseDateByLine = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        }
    }
    return '';
}

export const parseDateStringToFormat = (dateStr: string): string => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        if (!isNaN(parseInt(day, 10)) && !isNaN(parseInt(month, 10)) && !isNaN(parseInt(year, 10))) {
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }
    return generalCurrentDate;
}

export const replaceSlashWithDash = (stringQuery: string): string => {
    return stringQuery.replace(/\//g, '-');
}

export const formatCurrencyMX = (amount: number): string => {
    try {
        const formattedAmount: string = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);

        return formattedAmount;
    } catch (error) {
        return 'Error: Please enter a valid numeric value.';
    }
}
