export const getBorrower = () => {
    const data = localStorage.getItem('myBorrowerList');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}

export const setBorrower = (data) => {
    localStorage.setItem('myBorrowerList', JSON.stringify(data));
}