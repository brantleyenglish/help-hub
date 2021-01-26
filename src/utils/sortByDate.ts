import { AssistanceDataType, MessageType, ClientFiles, ClientNotes } from '../../DataTypes';

const sortByDate = (
    a: AssistanceDataType | MessageType | ClientFiles | ClientNotes,
    b: AssistanceDataType | MessageType | ClientFiles | ClientNotes
) => {
    const aDate = Number(a?.date?.slice(0, 2));
    const aMonth = Number(a?.date?.slice(5, 7));
    const aYear = Number(a?.date?.slice(10, 14));

    const bDate = Number(b?.date?.slice(0, 2));
    const bMonth = Number(b?.date?.slice(5, 7));
    const bYear = Number(b?.date?.slice(10, 14));

    if (aYear && bYear) {
        if (aYear > bYear) {
            return -1;
        }
        if (aYear < bYear) {
            return 1;
        }
    }
    if (aMonth && bMonth) {
        if (aMonth > bMonth) {
            return -1;
        }
        if (aMonth < bMonth) {
            return 1;
        }
    }
    if (aDate && bDate) {
        if (aDate > bDate) {
            return -1;
        }
        if (aDate < bDate) {
            return 1;
        }
    }
    return 0;
};

export default sortByDate;