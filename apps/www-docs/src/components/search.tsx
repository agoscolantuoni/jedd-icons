"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
  TagsList,
  TagsListItem,
} from "fumadocs-ui/components/dialog/search";
import { useState } from "react";

export default function CustomSearchDialog(props: SharedProps) {
  const [tag, setTag] = useState<string | undefined>();
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    tag,
  });

  return (
    <SearchDialog
      isLoading={query.isLoading}
      onSearchChange={setSearch}
      search={search}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data === "empty" ? null : query.data} />
        <SearchDialogFooter className="flex flex-row">
          <TagsList onTagChange={setTag} tag={tag}>
            <TagsListItem value="docs">Docs</TagsListItem>
            <TagsListItem value="icons">Icons</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
