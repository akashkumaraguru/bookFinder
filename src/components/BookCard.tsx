import { Book } from "@/types/book";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder.svg";

  const firstPublishYear = book.first_publish_year;
  const author = book.author_name?.[0] || "Unknown Author";

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white/95 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        {firstPublishYear && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-white/80 backdrop-blur text-xs text-gray-800 hover:bg-[#01A1B6] hover:text-white shadow-sm">
              {firstPublishYear}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-base text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-primary">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{author}</p>

        <div className="flex items-center justify-between">
          <button className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
