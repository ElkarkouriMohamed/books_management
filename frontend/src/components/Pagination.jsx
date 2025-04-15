import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, visibleRange }) => {
  const [range, setRange] = useState([0, visibleRange])

  useEffect(() => {
    console.log('range', range); 
  }, [range])
  useEffect(() => {
    console.log('currentPage', currentPage); 
  }, [currentPage])

  useEffect(() => {
    setRange([0, Math.min(totalPages, visibleRange)]); 
  }, [totalPages])

  useEffect(() => {
    console.log('currentPage', currentPage); 
    if (currentPage > range[1]) setRange([currentPage-1, Math.min(currentPage+(visibleRange-1), totalPages)]);
    if (currentPage <= range[0] && currentPage!==1) setRange([Math.max(currentPage-visibleRange, 0), currentPage]);
  }, [currentPage])

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button 
        variant="ghost" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        <ArrowLeft />
      </Button>
      {[...Array(range[1] - range[0])].map((_, i) => {
        const page = range[0] + 1 + i;

        return (<Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className={cn(page === currentPage && "cursor-pointer bg-primary text-white", 'cursor-pointer')}
          >
            {page}
          </Button>)
      })}
      { (range[1]-totalPages !== 0) && <Button variant="ghost" >...</Button> }
      <Button 
        variant="ghost" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
