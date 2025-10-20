"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";

interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
  initialTag: string;
}

function NotesClient({
  initialPage,
  initialSearch,
  initialTag,
}: NotesClientProps) {
  const [curPage, setCurPage] = useState(initialPage);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [tag] = useState(initialTag);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setCurPage(1);
  }, 500);

  const tagForApi = tag !== "all" ? tag : undefined;

  const { data, isSuccess } = useQuery({
    queryKey: ["note", curPage, searchValue, tag],
    queryFn: () => fetchNotes({ page: curPage, searchValue, tag: tagForApi }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={searchValue} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            curPage={curPage}
            onChange={setCurPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
