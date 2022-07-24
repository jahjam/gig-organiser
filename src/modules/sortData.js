import createMonth from './createMonth.js';

class SortData {
  months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  sortMonthsInOrder() {
    createMonth.gigsByMonth.sort(
      // Sort the months in order based on the months object
      (a, b) => this.months[a.month] - this.months[b.month]
    );
  }

  sortGigsInOrderOfDate() {
    createMonth.gigsByMonth.forEach(month => {
      month.gig.sort(
        (a, b) =>
          // Sort the gigs by date
          new Date(a.date.split('/').reverse().join('/')) -
          new Date(b.date.split('/').reverse().join('/'))
      );
    });
  }

  sortGigsInOrderOfStageTime() {
    createMonth.gigsByMonth.forEach(month => {
      month.gig.sort(
        (a, b) =>
          // Sort the gigs by stage time
          +a.stageTime.split(':')[0] - +b.stageTime.split(':')[0]
      );
    });
  }
}

export default new SortData();
