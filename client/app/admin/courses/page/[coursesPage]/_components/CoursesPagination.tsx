import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CoursesPagination = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  console.log(typeof currentPage);
  console.log(typeof totalPage);
  console.log(currentPage);
  console.log(totalPage);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* previous */}
        <PaginationItem>
          <PaginationPrevious
            href={`/admin/courses/page/${currentPage - 1}`}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50 " : ""
            }
          />
        </PaginationItem>

        {/* pages */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`/admin/courses/page/${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href={`/admin/courses/page/${currentPage}`}
            className="pointer-events-none"
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage !== totalPage && (
          <>
            <PaginationItem>
              <PaginationLink href={`/admin/courses/page/${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>

            {/* Ellipsis */}
            <PaginationItem className="">
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* next */}
        <PaginationItem>
          <PaginationNext
            href={`/admin/courses/page/${currentPage + 1}`}
            className={
              currentPage === totalPage ? "pointer-events-none opacity-50 " : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoursesPagination;
