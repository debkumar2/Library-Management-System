import '../utils/Pagination.css';

function Pagination({ totalBooks, booksPerPage, setCurrentPage, currentPage }) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pages.push(i);
    }
    return (
        <>
            <div className="flex flex-row items-center justify-center pagination">
                {
                    pages.map((page, index) => {
                        return (
                            <button className={`px-2 py-1 border border-black mx-2 my-6 ${page == currentPage ? `active` : ``}`} key={index} onClick={() => {
                                setCurrentPage(page)
                            }}>{page}</button>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Pagination;