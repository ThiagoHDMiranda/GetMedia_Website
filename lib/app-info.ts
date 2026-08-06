import pkgRaw from "@pkg";

type PackageMeta = {
  name: string;
  version: string;
  description?: string;
  license?: string;
  author?: { email?: string };
  build?: { productName?: string };
};

const pkg = pkgRaw as PackageMeta;

export const APP_INFO = {
  name: pkg.build?.productName ?? pkg.name,
  version: pkg.version,
  author: "Thiago Miranda",
  authorEmail: pkg.author?.email ?? "",
  license: pkg.license ?? "MIT",
  description: pkg.description ?? "",
} as const;
