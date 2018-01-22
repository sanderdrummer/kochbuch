export const dateService = {

    getDateString(date) {

           return date && date.toISOString ?
               date.toISOString().substring(0, 10) : '';
    },

    getMonthYearUrl(date) {
        const dateString = this.getDateString(date);
        const dateStringArray = dateString.split('-');

        if (dateStringArray.length > 2) {
            return dateStringArray[0] + '/' + dateStringArray[1] + '/';
        } else {
            return '';
        }

    }

};