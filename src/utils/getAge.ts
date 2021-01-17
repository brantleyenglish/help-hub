const getAge = (dob: string) => {
    const dobDate = Number(dob?.slice(0, 2));
    const dobMonth = Number(dob?.slice(5, 7));
    const dobYear = Number(dob?.slice(10, 14));
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const yearDifference = currentYear - dobYear;
    if (currentMonth > dobMonth || (dobMonth === currentMonth && currentDay >= dobDate)) {
        return yearDifference;
    };
    return yearDifference - 1;
};

export default getAge;