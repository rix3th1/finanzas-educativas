import fs from "fs/promises";

/**
 * Function to get all pages in the project
 * @returns pages
 */
export const getAllPages = async () => {
  const basePath = "./src/app"; // Base path for your pages

  const collectPages = async (
    currentPath: string,
    currentPages: string[] = []
  ) => {
    const items = await fs.readdir(currentPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = `${currentPath}/${item.name}`;
      if (item.isDirectory()) {
        // Exclude API directory
        if (!fullPath.includes("/api")) {
          await collectPages(fullPath, currentPages);
        }
      } else if (
        item.isFile() &&
        item.name.endsWith(".tsx") &&
        item.name !== "index.tsx"
      ) {
        // Replace path and format for URL
        const relativePath = fullPath
          .replace(basePath, "")
          .replace(".tsx", "")
          .replace("/index", "")
          .replace(/\\/g, "/");
        currentPages.push(relativePath);
      }
    }
  };

  const pages: string[] = [];
  await collectPages(basePath, pages);
  return pages;
};
