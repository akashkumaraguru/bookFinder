import { Book } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, User, Calendar, Hash } from "lucide-react";

interface BookDetailsProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

export const BookDetails = ({ book, open, onClose }: BookDetailsProps) => {
  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "/placeholder.svg";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <ScrollArea className="max-h-[85vh]">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b">
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold text-foreground tracking-tight">
                {book.title}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-[280px_1fr] gap-8 p-6">
            {/* Left: Book Cover */}
            <div className="space-y-4">
              <div className="aspect-[2/3] overflow-hidden rounded-xl bg-muted shadow-md">
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>

            {/* Right: Book Info */}
            <div className="space-y-6">
              {/* Author */}
              {book.author_name && (
                <div className="flex items-start gap-3">
                  <User className=" mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">Author(s)</p>
                    <div className="flex text-[#01A1B6] flex-wrap gap-2">
                      {book.author_name.map((author, idx) => (
                        <Badge key={idx} className="text-xs px-2 py-0.5">
                          {author}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* First Publish Year */}
              {book.first_publish_year && (
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">First Published</p>
                    <p className="font-medium text-foreground">{book.first_publish_year}</p>
                  </div>
                </div>
              )}

              {/* ISBN */}
              {book.isbn && book.isbn.length > 0 && (
                <div className="flex items-start gap-3">
                  <Hash className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">ISBN</p>
                    <p className="font-mono text-sm text-foreground">{book.isbn[0]}</p>
                  </div>
                </div>
              )}

              {/* Publisher */}
              {book.publisher && book.publisher.length > 0 && (
                <div className="flex items-start gap-3">
                  <BookOpen className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">Publisher(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {book.publisher.slice(0, 5).map((pub, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-0.5">
                          {pub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Subjects */}
              {book.subject && book.subject.length > 0 && (
                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-2 tracking-wide">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subj, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                        {subj}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Edition Count */}
              {book.edition_count && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {book.edition_count} edition{book.edition_count > 1 ? "s" : ""} available
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
