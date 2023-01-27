import MonthStorageModel from '../Model/MonthStorageModel';

class SortData {
  constructor() {
    this.months = {
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
  }

  SortMonthsInOrder() {
    const months_arr = MonthStorageModel.months_arr;

    months_arr.sort(
      // Sort the months in order based on the months object
      (a, b) => this.months[a.monthName] - this.months[b.monthName]
    );

    MonthStorageModel.months_arr = months_arr;
    console.log(MonthStorageModel.months_arr);
  }

  SortGigsInOrderOfDate() {
    const months_arr = MonthStorageModel.months_arr;

    months_arr.forEach(month =>
      month.gigs_arr.sort((a, b) => {
        // Sort the gigs by date
        console.log(a, b);
        return (
          new Date(a.date.split('/').reverse().join('/')) -
          new Date(b.date.split('/').reverse().join('/'))
        );
      })
    );

    MonthStorageModel.months_arr = months_arr;
  }

  SortGigsInOrderOfStageTime() {
    const months_arr = MonthStorageModel.months_arr;

    months_arr.forEach(month =>
      month.gigs_arr.sort(
        (a, b) =>
          // Sort the gigs by stage time
          +a.stageTime.split(':')[0] - +b.stageTime.split(':')[0]
      )
    );

    MonthStorageModel.months_arr = months_arr;
  }
}

export default new SortData();
