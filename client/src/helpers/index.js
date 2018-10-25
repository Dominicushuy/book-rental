import titleize from 'titleize';
import moment from 'moment';

export const rentalType = isShared => isShared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titleize(value) : '';

export const getRangeOfDates = ( startAt , endAt , dateFormat = 'Y/MM/DD' ) =>{
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    //Chạy vòng lặp white 
    while( mStartAt < mEndAt ){
        tempDates.push( mStartAt.format(dateFormat) );
        mStartAt = mStartAt.add(1,'day');
    }

    tempDates.push( mEndAt.format(dateFormat) );
    return tempDates;
}