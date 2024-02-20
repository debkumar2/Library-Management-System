
export const getBookData = () => {
    const data = localStorage.getItem('myBookList');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
export const setBookData = (data) => {
    localStorage.setItem('myBookList', JSON.stringify(data));
}