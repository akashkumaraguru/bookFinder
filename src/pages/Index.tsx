import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { BookDetails } from "@/components/BookDetails";
import { Book, SearchResponse } from "@/types/book";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-books.jpg";

const fetchBooks = async (query: string, searchType: string): Promise<SearchResponse> => {
  const params = new URLSearchParams();
  
  switch (searchType) {
    case "title":
      params.append("title", query);
      break;
    case "author":
      params.append("author", query);
      break;
    case "isbn":
      params.append("isbn", query);
      break;
    case "subject":
      params.append("subject", query);
      break;
  }
  
  params.append("limit", "20");
  
  const response = await fetch(`https://openlibrary.org/search.json?${params}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  
  return response.json();
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", searchQuery, searchType],
    queryFn: () => fetchBooks(searchQuery, searchType),
    enabled: !!searchQuery && !!searchType,
  });

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to fetch books. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-100" />
        <img 
          src={heroImage} 
          alt="Library background" 
          className="absolute inset-0 w-full h-full opacity-50 bg-black object-cover"
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#01A1B6]">
            Book Finder
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Discover your next great read. Search millions of books by title, author, ISBN, or subject.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-muted-foreground">Searching for books...</p>
          </div>
        )}

        {!searchQuery && !isLoading && (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-muted rounded-full mb-6">
              <BookOpen size={64} className="text-muted-foreground text-[#00000] " />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Start Your Search</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the search bar above to find books by title, author, ISBN, or subject.
            </p>
          </div>
        )}

        {data && !isLoading && (
          <>
            <div className="mb-8 ">
              <h2 className="text-2xl font-semibold mb-2">
                Search Results
              </h2>
              <p className="text-muted-foreground">
                Found {data.numFound.toLocaleString()} books
              </p>
            </div>

            {data.docs.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex p-6 bg-muted rounded-full mb-6">
                  <BookOpen size={64} className="text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No Books Found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or search type.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchType("");
                  }}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {data.docs.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <BookDetails
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

        <div className="text-center  mb-10 ">
          <h3>Design and developed by <a href="https://github.com/NanthineSri" target="_blank" className=" text-purple-500">Nanthine Sri </a></h3>
        </div>
      
    </div>
  );
};

export default Index;
