import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
const Pagin = ({ handleNext, handlePrevious, page, pageCount, setPage }) => {
  // pageCount is total pages
  return (
    <div className="pagination_div d-flex mx-5 justify-content-end">
      {pageCount > 0 && <Pagination>
        <Pagination.Prev onClick={handlePrevious} />

        {
          Array(pageCount)?.fill(null).map((e, i) => {
            return (
              <>
                <Pagination.Item
                  active={page == i + 1 ? true : false}
                  onClick={() => setPage(i + 1)}

                >{i + 1}</Pagination.Item>

              </>
            )
          })
        }
        <Pagination.Next onClick={handleNext} />

      </Pagination>}

    </div>
  )
}

export default Pagin