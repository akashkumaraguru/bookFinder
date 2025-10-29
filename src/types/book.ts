export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  publisher?: string[];
  subject?: string[];
  edition_count?: number;
}

export interface SearchResponse {
  numFound: number;
  docs: Book[];
}
