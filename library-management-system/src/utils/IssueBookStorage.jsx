export const getIssueBook = () => {
    const data = localStorage.getItem('issueBookList');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
export const setIssueBook = (data) => {
    localStorage.setItem('issueBookList', JSON.stringify(data));
}