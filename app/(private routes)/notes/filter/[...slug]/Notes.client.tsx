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
import Loader from "@/components/Loader/Loader";

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

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["note", curPage, searchValue, tag],
    queryFn: () => fetchNotes({ page: curPage, searchValue, tag: tagForApi }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className={css.app}>
        <div className={css.loadingWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.left}>
          <SearchBox onSearch={handleSearch} value={searchValue} />
        </div>
        <div className={css.center}>
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              curPage={curPage}
              onChange={setCurPage}
            />
          )}
        </div>
        <div className={css.right}>
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>
      </header>
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
